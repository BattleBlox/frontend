<template>
  <div class="c-computer-player" />
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { TURN_DESELECT_TILE, TURN_SET_ROLL_VALUE } from '@/store/mutations.constants'

export default {
  computed: {
    ...mapState('turn', [
      'selectedPlayer',
      'rangedTiles',
      'selectedTile',
      'rollValue'
    ]),

    ...mapState('players', [
      'players'
    ]),

    ...mapState('tiles', [
      'tiles'
    ]),

    playerTiles () {
      return this.tiles.filter(x => x.empire === this.selectedPlayer.name)
    },

    bonusCapitalPoints () {
      return this.tiles.filter(x => x.empire === this.selectedPlayer.name && x.hitPoints >= 10).length
    }
  },

  watch: {
    '$store.state.turn.selectedPlayer' () {
      this.detectPlayerChange()
    }
  },

  mounted () {
    this.detectPlayerChange()
  },

  methods: {
    ...mapMutations('turn', [TURN_SET_ROLL_VALUE, TURN_DESELECT_TILE]),

    ...mapActions('turn', [
      'selectTile',
      'roll',
      'endTurn'
    ]),

    ...mapActions('tiles', [
      'controlTile'
    ]),

    detectPlayerChange () {
      const self = this
      if (this.selectedPlayer.isComputer) {
        if (this.playerTiles.length > 0) {
          // eslint-disable-next-line no-console
          console.log('Computer Controlled Turn', this.selectedPlayer.name)

          setTimeout(function () { self.play() }, 2000)
        } else {
          this.endTurn()
        }
      }
    },

    makeDecision () {
      const result = Math.floor(Math.random() * 9) + 1

      return result <= 2
    },

    play () {
      for (let attackLoop = 0; attackLoop < 10; attackLoop++) {
        // Prevent a bug which causes a tile to be selected and then deselected on subsequent loops
        this.TURN_DESELECT_TILE()

        this.playerTiles.filter(x => x.hitPoints > 1).forEach((tile) => {
          this.processAttacks(tile)
        })
      }

      this.roll({
        controlledTiles: this.playerTiles.length,
        capitalTiles: this.bonusCapitalPoints
      })

      this.spendPoints()

      this.endTurn()
    },

    processAttacks (tile) {
      if (tile.hitPoints < 2) { return }

      this.selectTile(tile)

      // Select one tile to attack
      const defendingTile = this.tiles.find(x =>
        // Filter only enemy or neutral tiles
        x.empire !== 'blocked' && x.empire !== this.selectedPlayer.name &&

        // Filter only tiles within range
        this.rangedTiles.includes(x.identifier) &&

        // Filter only tiles the computer wants to attack
        (x.hitPoints < (this.selectedTile.hitPoints + 1) || (this.makeDecision() && x.hitPoints < (this.selectedTile.hitPoints + 3)))
      )

      if (defendingTile) {
        this.attackTile(defendingTile)
      }
    },

    attackTile (defendingTile) {
      let attackerHitPoints = this.selectedTile.hitPoints
      let defenderHitPoints = defendingTile.hitPoints

      // Neutral tiles don't put up a fight
      if (defenderHitPoints < 1) {
        this.claimTile(attackerHitPoints, defendingTile.identifier)
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
        this.claimTile(attackerHitPoints, defendingTile.identifier)
      } else {
        this.loseBattle(defendingTile, defenderHitPoints)
      }
    },

    claimTile (attackerHitPoints, tileIdentifier) {
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
        tileIdentifier: this.selectedTile.identifier
      })
    },

    loseBattle (defendingTile, defenderHitPoints) {
      // Update attacking tile
      this.controlTile({
        empire: this.selectedPlayer.name,
        hitPoints: 1,
        tileIdentifier: this.selectedTile.identifier
      })

      // Update defending tile
      this.controlTile({
        empire: defendingTile.empire,
        hitPoints: defenderHitPoints,
        tileIdentifier: defendingTile.identifier
      })
    },

    spendPoints () {
      // Spend on Defence
      let loop = 0
      while (this.rollValue > 0) {
        for (const tile of this.playerTiles) {
          if (this.rollValue === 0) {
            return
          }

          if (tile.hitPoints > 20) {
            continue
          }

          this.selectTile(tile)

          const enemyTiles = this.tiles.filter(enemyTile =>
            // Identify enemy tiles
            this.rangedTiles.includes(enemyTile.identifier) &&
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

            break
          }
        }

        loop++

        if (loop > 20) {
          break
        }
      }

      // Spend on Exploration
      loop = 0
      while (this.rollValue > 0) {
        for (const tile of this.playerTiles) {
          if (this.rollValue === 0) {
            return
          }

          if (tile.hitPoints > 1) {
            continue
          }

          this.selectTile(tile)

          const neutralTiles = this.tiles.filter(x =>
            this.rangedTiles.includes(x.identifier) &&
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

      // Spend on Attacks
      loop = 0
      while (this.rollValue > 0) {
        for (const tile of this.playerTiles) {
          if (this.rollValue === 0) {
            return
          }

          if (tile.hitPoints > 20) {
            continue
          }

          this.selectTile(tile)

          const enemyTiles = this.tiles.filter(x =>
            this.rangedTiles.includes(x) &&
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

        if (loop > 30) {
          break
        }
      }

      // Randomly Spend Points
      loop = 0
      while (this.rollValue > 0) {
        const randomTile = Math.floor(Math.random() * this.playerTiles.length) + 1

        const tile = this.playerTiles[randomTile - 1]

        this.selectTile(tile)

        console.log('random')

        this.TURN_SET_ROLL_VALUE(this.rollValue - 1)

        this.controlTile({
          empire: this.selectedPlayer.name,
          hitPoints: tile.hitPoints + 1,
          tileIdentifier: tile.identifier
        })

        loop++

        if (loop > 20) {
          break
        }
      }
    }
  }
}
</script>
