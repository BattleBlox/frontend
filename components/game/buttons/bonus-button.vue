<template>
  <div
    class="c-bonus-button u-game-button u-pointer"
    title="View Bonus Points">
    <c-icon
      icon="trophy"
      class="u-flex-grow"
      @click="showModal = true" />
    <modal
      v-if="showModal"
      heading="Bonus Points"
      @close="showModal = false">
      <p>You can play BattleBlox with lots of different strategies by taking advantage of the variety of bonuses available.</p>
      <p>All bonuses increase the amount of points you can spend at the end of each round.</p>
      <p class="u-text-red">
        Your current total bonus is {{ totalBonusPoints }} point(s)
      </p>
      <br>

      <h4>Rolling the Dice</h4>
      <p>When you have no bonus points, you simply score the roll of the dice; meaning a minimum of 1 per round, up to a maximum of six.</p>
      <p class="u-text-red">
        Taking into account your bonuses, you can score a minimum of <strong>{{ minimumRoll }}</strong> points and a maximum of <strong>{{ maximumRoll }}</strong> points per round
      </p>
      <br>

      <h4>Expansion Bonus Points</h4>
      <p>Gain an extra point for every 4 tiles under your control.</p>
      <p class="u-text-red">
        You have <strong>{{ totalPlayerTiles }}</strong> tile(s) resulting in a bonus of <strong>{{ playerTilesBonus }}</strong> point(s)
      </p>
      <br>

      <h4>Capital Bonus Points</h4>
      <p>Gain an extra 2 points for every tile you own which has 10 or higher points.</p>
      <p class="u-text-red">
        You have <strong>{{ totalCapitalTiles }}</strong> tile(s) with 10 or greater points resulting in a bonus of <strong>{{ bonusCapitalPoints }}</strong> points
      </p>
    </modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      showModal: false
    }
  },

  computed: {
    ...mapState('tiles', [
      'tiles'
    ]),

    ...mapState('turn', [
      'selectedPlayer'
    ]),

    totalPlayerTiles () {
      return this.tiles.filter(x => x.empire === this.selectedPlayer.name).length
    },

    playerTilesBonus () {
      return Math.floor(this.totalPlayerTiles / 4)
    },

    totalCapitalTiles () {
      return this.tiles.filter(x => x.empire === this.selectedPlayer.name && x.hitPoints >= 10).length
    },

    bonusCapitalPoints () {
      return Math.floor(this.totalCapitalTiles * 2)
    },

    totalBonusPoints () {
      return this.bonusCapitalPoints + this.playerTilesBonus
    },

    minimumRoll () {
      return (1 + this.playerTilesBonus + this.bonusCapitalPoints)
    },

    maximumRoll () {
      return (6 + this.playerTilesBonus + this.bonusCapitalPoints)
    }
  }

}
</script>

<style scoped lang="scss">
.c-bonus-button {
  right: 70px;
  top: 10px;
}
</style>
