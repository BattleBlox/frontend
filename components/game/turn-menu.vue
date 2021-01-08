<template>
  <div class="c-turn-menu">
    <div class="c-turn-menu-header">
      <img
        :class="`c-turn-menu-header-avatar ${playerColourClass}`"
        src="/soldier.png">

      <p v-show="!gameOver && isComputerPlayer">
        Waiting for Computer player...
      </p>

      <p v-show="!gameOver && !isComputerPlayer && currentMode === 'attack'">
        Select a tile and attack
      </p>

      <p v-show="!gameOver && !isComputerPlayer && currentMode === 'roll'">
        Spend {{ rollValue }} Points
      </p>

      <p v-show="gameOver">
        Game won by {{ selectedPlayer.name }}!
      </p>

      <c-icon
        v-show="!gameOver && isComputerPlayer"
        class="c-turn-menu-header-spinner fa-spin"
        icon="spinner" />

      <img
        v-show="!gameOver && !isComputerPlayer && currentMode === 'attack'"
        class="c-turn-menu-header-endTurn u-pointer"
        src="/roll.png"
        @click="rollDice">

      <img
        v-show="!gameOver && !isComputerPlayer && currentMode === 'roll' && rollValue > 0"
        class="c-turn-menu-header-endTurn"
        title="Please spend your points"
        src="/next-disabled.png">
    </div>

    <div :class="`c-turn-menu-footer ${playerColourClass}`">
      <h3 v-text="selectedPlayer.name" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('turn', [
      'selectedPlayer',
      'currentMode',
      'rollValue',
      'gameOver'
    ]),

    ...mapState('players', [
      'players'
    ]),

    ...mapState('tiles', [
      'tiles'
    ]),

    isComputerPlayer () {
      const player = this.players.find(plr => plr.name === this.selectedPlayer.name)

      return player.isComputer
    },

    playerColourClass () {
      const player = this.players.find(plr => plr.name === this.selectedPlayer.name)

      return `u-background--${player.colour}`
    }
  },

  watch: {
    '$store.state.tiles.tiles' () {
      let remainingPlayers = this.tiles.filter(x => x.empire !== null && x.empire !== 'blocked').map(x => x.empire)
      remainingPlayers = [...new Set(remainingPlayers)]

      if (remainingPlayers.length === 1) {
        const winner = this.players.find(x => x.name === remainingPlayers[0])
        this.setGameOver(winner)
      }
    }
  },

  methods: {
    ...mapActions('turn', [
      'roll',
      'endTurn',
      'setGameOver'
    ]),

    rollDice () {
      switch (this.currentMode) {
        case 'roll':
          this.endTurn()
          break
        case 'attack':
          this.roll()
          break
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .c-turn-menu {
    position: fixed;
    bottom: 0px;
    right: 0;
    left: 0;
    margin: 0 auto;
    width: 450px;
    z-index: 250;
    user-select: none;
  }

  .c-turn-menu-header {
    position: relative;
    background: rgba(30, 30, 30, 0.6);
    color: white;
    padding: 20px;
    text-align: center;
    width: 450px;
    margin: 0 auto;
  }

  .c-turn-menu-footer {
    padding: 15px;
    text-align: center;
    border-radius: 10px;
    color: white;
    transition: all 0.3s ease-in-out;
    border: 2px solid black;
  }

  .c-turn-menu-header-avatar {
    position: absolute;
    left: -25px;
    top: -45px;
    width: 125px;
    height: 125px;
    border-radius: 50%;
    border: 10px solid black;
    transition: all 0.3s ease-in-out;
  }

  .c-turn-menu-header-endTurn {
    position: absolute;
    right: -25px;
    top: -45px;
    width: 125px;
    height: 125px;
    border-radius: 50%;
    border: 10px solid black;
  }

  .c-turn-menu-header-spinner {
    position: absolute;
    right: -25px;
    top: -45px;
    width: 125px;
    height: 125px;
    padding: 20px;
    border-radius: 50%;
    border: 10px solid black;
    background-color: black;
  }

  .u-pointer {
    cursor: pointer;
  }
</style>
