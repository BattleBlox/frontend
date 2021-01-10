<template>
  <div class="c-turn-menu a-fadeIn">
    <div class="c-turn-menu-header">
      <img
        :class="`c-turn-menu-header-avatar ${playerColourClass}`"
        src="/soldier.png">

      <p
        v-text="actionText" />

      <c-icon
        v-show="!gameOver && isComputerPlayer"
        :class="`c-turn-menu-header-spinner fa-spin ${playerColourClass}`"
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
      <expansion-bonus-indicator />

      <h3
        v-text="selectedPlayer.name" />

      <capital-bonus-indicator />
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
    },

    actionText () {
      if (this.gameOver) {
        return `Game won by ${this.selectedPlayer.name}`
      }

      if (this.isComputerPlayer) {
        return 'Waiting for computer player...'
      }

      return (this.currentMode === 'attack')
        ? 'Select a tile and attack'
        : `Spend ${this.rollValue} points`
    }
  },

  watch: {
    '$store.state.tiles.tiles' () {
      let remainingPlayerNames = this.tiles.filter(tiles =>
        tiles.empire !== null &&
        tiles.empire !== 'blocked'
      ).map(tiles =>
        tiles.empire
      )

      // Dedupe the remaining player names
      remainingPlayerNames = [
        ...new Set(remainingPlayerNames)
      ]

      if (remainingPlayerNames.length === 1) {
        this.setGameOver(this.players.find(x =>
          x.name === remainingPlayerNames[0]
        ))
      }
    }
  },

  methods: {
    ...mapActions('turn', [
      'roll',
      'setGameOver'
    ]),

    rollDice () {
      this.roll()
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
    width: 500px;
    max-width: 85vw;
    z-index: 250;
    user-select: none;
  }

  .c-turn-menu-header {
    position: relative;
    background: rgba(30, 30, 30, 0.6);
    padding: 20px;
    text-align: center;
    width: 100%;
    margin: 0 auto;

    @media (max-width: 450px) {
      padding: 12.5px;
    }
  }

  .c-turn-menu-footer {
    display: flex;
    align-items: center;
    padding: 10px;
    text-align: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border: 5px solid rgba(#000, .2);
    border-top: 0;
    border-bottom: 0;
    transition: all 0.3s ease-in-out;

    h3 {
      flex-grow: 1;
    }

    @media (max-width: 450px) {
      padding: 5px 10px;
    }
  }

  .c-turn-menu-header-avatar {
    position: absolute;
    left: -20px;
    top: -25px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 6px solid rgba(#000, .2);
    transition: all 0.3s ease-in-out;

    @media (max-width: 450px) {
      left: -15px;
      top: -30px;
      width: 80px;
      height: 80px;
    }
  }

  .c-turn-menu-header-endTurn {
    position: absolute;
    right: -20px;
    top: -25px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 6px solid rgba(#000, .2);

    @media (max-width: 450px) {
      right: -15px;
      top: -30px;
      width: 80px;
      height: 80px;
    }
  }

  .c-turn-menu-header-spinner {
    position: absolute;
    right: -20px;
    top: -25px;
    width: 100px;
    height: 100px;
    padding: 30px;
    border-radius: 50%;
    transition: all 0.2s ease-in-out;
    border: 6px solid rgba(#000, .2);

    @media (max-width: 450px) {
      right: -15px;
      top: -30px;
      padding: 20px;
      width: 80px;
      height: 80px;
    }
  }
</style>
