<template>
  <div class="c-computer-player" />
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import {
  TURN_DESELECT_TILE,
  TURN_SET_ROLL_VALUE,
  TURN_SELECT_MODE
} from '@/store/mutations.constants'

export default {
  computed: {
    ...mapState('turn', [
      'selectedPlayer',
      'rollValue',
      'gameOver'
    ]),

    ...mapState('players', [
      'players'
    ]),

    ...mapState('tiles', [
      'tiles'
    ]),

    ...mapState('settings', [
      'computerSpeed'
    ]),

    playerTiles () {
      return this.tiles.filter(x => x.empire === this.selectedPlayer.name)
    }
  },

  watch: {
    '$store.state.turn.selectedPlayer' () {
      if (!this.gameOver) {
        this.detectPlayerChange()
      }
    }
  },

  mounted () {
    this.detectPlayerChange()
  },

  methods: {
    ...mapMutations('turn', [
      TURN_SET_ROLL_VALUE,
      TURN_DESELECT_TILE,
      TURN_SELECT_MODE
    ]),

    ...mapActions('turn', [
      'roll',
      'endTurn'
    ]),

    ...mapActions('tiles', [
      'controlTile'
    ]),

    detectPlayerChange () {
      if (this.selectedPlayer.isComputer) {
        if (this.playerTiles.length === 0) {
          this.endTurn()
          return
        }

        setTimeout(() => {
          this.processAttackPhase()

          setTimeout(() => {
            this.processRollPhase()

            setTimeout(() => { this.endTurn() }, this.computerSpeed)
          }, this.computerSpeed)
        }, this.computerSpeed)
      }
    },

    processAttackPhase () {
      const maxHitPoints = Math.max.apply(Math, this.playerTiles.map((x) => { return x.hitPoints }))

      for (let attackLoop = 0; attackLoop < maxHitPoints; attackLoop++) {
        // Prevent a bug which causes a tile to be selected and then deselected on subsequent loops
        this.TURN_DESELECT_TILE()

        // Process each tile with attacking capability
        this.playerTiles.filter(x => x.hitPoints > 1).forEach((tile) => {
          this.processTileAttacks(tile)
        })

        // Break loop when no attacking capability remains
        if (!this.playerTiles.some(x => x.hitPoints > 1)) {
          break
        }
      }

      this.TURN_DESELECT_TILE()
    },

    processRollPhase () {
      this.roll()
      this.spendPoints()
      this.TURN_SELECT_MODE('end')
      this.TURN_DESELECT_TILE()
    },

    processTileAttacks (tile) {
      const ambitionOverride = ((Math.floor(Math.random() * 9) + 1) <= 2)

      // Select one tile to attack
      const potentialTargets = this.tiles.filter(x =>
        // Filter only enemy or neutral tiles
        x.empire !== 'blocked' && x.empire !== this.selectedPlayer.name &&

        // Filter only tiles within range
        tile.rangedTiles.includes(x.identifier) &&

        // Filter only tiles the computer wants to attack
        (x.hitPoints < (tile.hitPoints + 1) || (ambitionOverride && x.hitPoints < (tile.hitPoints + 3)))
      )

      if (potentialTargets.length > 0) {
        const randomTarget = Math.floor(Math.random() * potentialTargets.length) + 1
        this.attackTile(tile, potentialTargets[randomTarget - 1])
      }
    },

    attackTile (attackingTile, defendingTile) {
      let attackerHitPoints = attackingTile.hitPoints
      let defenderHitPoints = defendingTile.hitPoints

      // Neutral tiles don't put up a fight
      if (defenderHitPoints < 1) {
        this.claimTile(attackingTile, attackerHitPoints, defendingTile.identifier)
        return
      }

      while (attackerHitPoints > 1 && defenderHitPoints > 1) {
        const result = Math.floor(Math.random() * 10) + 1

        if (result <= 4) {
          attackerHitPoints--
        } else {
          defenderHitPoints--
        }
      }

      if (attackerHitPoints > defenderHitPoints) {
        this.claimTile(attackingTile, attackerHitPoints, defendingTile.identifier)
      } else {
        this.loseBattle(attackingTile, defendingTile, defenderHitPoints)
      }
    },

    claimTile (attackingTile, attackerHitPoints, tileIdentifier) {
      // Steal tile
      this.controlTile({
        empire: this.selectedPlayer.name,
        hitPoints: attackerHitPoints - 1,
        tileIdentifier
      })

      // Update attacking tile
      this.controlTile({
        empire: this.selectedPlayer.name,
        hitPoints: 1,
        tileIdentifier: attackingTile.identifier
      })
    },

    loseBattle (attackingTile, defendingTile, defenderHitPoints) {
      // Update attacking tile
      this.controlTile({
        empire: this.selectedPlayer.name,
        hitPoints: 1,
        tileIdentifier: attackingTile.identifier
      })

      // Update defending tile
      this.controlTile({
        empire: defendingTile.empire,
        hitPoints: defenderHitPoints,
        tileIdentifier: defendingTile.identifier
      })
    },

    spendPoints () {
      this.spendOnDefence()

      this.spendOnDefence()

      this.spendOnExploration()

      this.spendRandomly()
    },

    spendOnDefence () {
      let loop = 0
      while (this.rollValue > 0) {
        for (const tile of this.playerTiles) {
          const enemyTiles = this.tiles.filter(enemyTile =>
            // Identify enemy tiles
            tile.rangedTiles.includes(enemyTile.identifier) &&
            enemyTile.empire !== this.selectedPlayer.name &&
            enemyTile.empire !== 'blocked' &&
            enemyTile.empire !== null &&

            // Identify tiles which challenge the selected tile
            enemyTile.hitPoints >= tile.hitPoints
          )

          if (enemyTiles.length > 0) {
            this.TURN_SET_ROLL_VALUE(this.rollValue - 1)

            this.controlTile({
              empire: this.selectedPlayer.name,
              hitPoints: tile.hitPoints + 1,
              tileIdentifier: tile.identifier
            })

            if (this.rollValue === 0) {
              return
            }

            break
          }
        }

        loop++

        if (loop > 20) { break }
      }
    },

    spendOnExploration () {
      let loop = 0
      while (this.rollValue > 0) {
        for (const tile of this.playerTiles) {
          if (this.rollValue === 0) {
            return
          }

          if (tile.hitPoints > 1) {
            continue
          }

          const neutralTiles = this.tiles.filter(x =>
            tile.rangedTiles.includes(x.identifier) &&
            x.empire === null
          )

          if (neutralTiles.length > 0) {
            this.TURN_SET_ROLL_VALUE(this.rollValue - 1)

            this.controlTile({
              empire: this.selectedPlayer.name,
              hitPoints: tile.hitPoints + 1,
              tileIdentifier: tile.identifier
            })

            break
          }
        }

        loop++

        if (loop > 30) {
          break
        }
      }
    },

    spendOnAttacks () {
      let loop = 0
      while (this.rollValue > 0) {
        for (const tile of this.playerTiles) {
          if (this.rollValue === 0) {
            return
          }

          const enemyTiles = this.tiles.filter(x =>
            tile.rangedTiles.includes(x) &&
            x.empire !== this.selectedPlayer.name &&
            x.empire !== 'blocked' &&
            x.hitPoints >= tile.hitPoints
          )

          if (enemyTiles.length > 0) {
            this.TURN_SET_ROLL_VALUE(this.rollValue - 1)

            this.controlTile({
              empire: this.selectedPlayer.name,
              hitPoints: tile.hitPoints + 1,
              tileIdentifier: tile.identifier
            })

            break
          }
        }

        loop++

        if (loop > 30) { break }
      }
    },

    spendRandomly () {
      while (this.rollValue > 0) {
        const randomTile = Math.floor(Math.random() * this.playerTiles.length) + 1
        const tile = this.playerTiles[randomTile - 1]

        this.TURN_SET_ROLL_VALUE(this.rollValue - 1)

        this.controlTile({
          empire: tile.empire,
          hitPoints: tile.hitPoints + 1,
          tileIdentifier: tile.identifier
        })
      }
    }
  }
}
</script>
