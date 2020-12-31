<template>
  <div class="c-computer-player" />
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { TURN_SET_ROLL_VALUE } from '@/store/mutations.constants'

export default {
  computed: {
    ...mapState('turn', [
      'selectedPlayer',
      'rangedTiles',
      'selectedTile',
      'selectedTileHitPoints',
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
    ...mapMutations('turn', [TURN_SET_ROLL_VALUE]),

    ...mapActions('turn', [
      'selectTile',
      'selectMode',
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

      return result <= 3
    },

    play () {
      // Attack Phase
      for (let loop = 0; loop < 10; loop++) {
        this.playerTiles.filter(x => x.hitPoints > 1).forEach((tile, i) => {
          this.processTile(tile)
        })
      }

      // Roll Phase
      this.selectMode('roll')

      this.roll({
        controlledTiles: this.playerTiles.length,
        capitalTiles: this.bonusCapitalPoints
      })

      this.spendPoints()

      this.endTurn()
    },

    processTile (tile) {
      if (tile.hitPoints > 1) {
        this.selectTile({
          selectedTile: tile.identifier,
          empire: tile.empire,
          hitPoints: tile.hitPoints
        })

        if (this.rangedTiles) {
          const defendingTiles = this.tiles.filter(x => x.empire !== 'blocked' && x.empire !== this.selectedPlayer.name && this.rangedTiles.includes(x.identifier))

          let defendingTile = null

          for (const targetTile of defendingTiles) {
            if (targetTile.hitPoints < (this.selectedTileHitPoints + 1) || (this.makeDecision() && targetTile.hitPoints < (this.selectedTileHitPoints + 3))) {
              defendingTile = targetTile
              break
            }
          }

          if (defendingTile) {
            this.attackTile(defendingTile)
          }
        }
      }
    },

    attackTile (defendingTile) {
      let attackerHitPoints = this.selectedTileHitPoints
      let defenderHitPoints = defendingTile.hitPoints

      if (defenderHitPoints < 1) {
        this.claimTile(attackerHitPoints, defendingTile.identifier)
      } else {
        while (attackerHitPoints > 1 && defenderHitPoints > 1) {
          const result = Math.floor(Math.random() * 5) + 1

          if (result < 3) {
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
      }
    },

    claimTile (attackerHitPoints, tileIdentifier) {
      this.controlTile({
        empire: this.selectedPlayer.name,
        hitPoints: attackerHitPoints - 1,
        tileIdentifier
      })

      this.controlTile({
        empire: this.selectedPlayer.name,
        hitPoints: 1,
        tileIdentifier: this.selectedTile
      })
    },

    loseBattle (defendingTile, defenderHitPoints) {
      this.controlTile({
        empire: this.selectedPlayer.name,
        hitPoints: 1,
        tileIdentifier: this.selectedTile
      })

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

          this.selectTile({
            selectedTile: tile.identifier,
            empire: this.selectedPlayer.name,
            hitPoints: tile.hitPoints
          })

          for (const enemyTileId of this.rangedTiles) {
            const enemyTile = this.tiles.find(x => x.identifier === enemyTileId && x.empire !== this.selectedPlayer.name && x.empire !== 'blocked')

            if (enemyTile && enemyTile.hitPoints >= tile.hitPoints && enemyTile.hitPoints > 1 && tile.hitPoints < 21) {
              this.TURN_SET_ROLL_VALUE(this.rollValue - 1)

              this.controlTile({
                empire: this.selectedPlayer.name,
                hitPoints: tile.hitPoints + 1,
                tileIdentifier: tile.identifier
              })

              break
            }
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
          this.selectTile({
            selectedTile: tile.identifier,
            empire: this.selectedPlayer.name,
            hitPoints: tile.hitPoints
          })

          const neutralTiles = this.tiles.filter(x => this.rangedTiles.includes(x.identifier) && x.empire === null)

          if (neutralTiles && neutralTiles.length > 0 && tile.hitPoints === 1) {
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

      // Spend on Attacks
      loop = 0
      while (this.rollValue > 0) {
        for (const tile of this.playerTiles) {
          if (this.rollValue === 0) {
            return
          }
          this.selectTile({
            selectedTile: tile.identifier,
            empire: this.selectedPlayer.name,
            hitPoints: tile.hitPoints
          })

          for (const enemyTileId of this.rangedTiles) {
            const enemyTile = this.tiles.find(x => x.identifier === enemyTileId && x.empire !== this.selectedPlayer.name && x.empire !== 'blocked')

            if (enemyTile && enemyTile.hitPoints <= tile.hitPoints && tile.hitPoints < 21) {
              this.TURN_SET_ROLL_VALUE(this.rollValue - 1)

              this.controlTile({
                empire: this.selectedPlayer.name,
                hitPoints: tile.hitPoints + 1,
                tileIdentifier: tile.identifier
              })

              break
            }
          }
        }

        loop++

        if (loop > 20) {
          break
        }
      }

      // Randomly Spend Points
      loop = 0
      while (this.rollValue > 0) {
        const randomTile = Math.floor(Math.random() * this.playerTiles.length) + 1

        const tile = this.playerTiles[randomTile - 1]

        this.selectTile({
          selectedTile: tile.identifier,
          empire: this.selectedPlayer.name,
          hitPoints: tile.hitPoints
        })

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
