<template>
  <form
    class="c-setup"
    @submit.prevent="startGame">
    <label>
      Blocked Tiles
      <input v-model="blockedTileCount" type="number" required>
    </label>

    <label>
      Starting Points
      <input v-model="startingPoints" type="number" required>
    </label>

    <button type="submit">
      Start Game
    </button>
  </form>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { PLAYERS_SET_PLAYERS } from '@/store/mutations.constants'

export default {
  data () {
    return {
      startingPoints: 3,
      blockedTileCount: 25
    }
  },
  computed: {
    ...mapState('turn', [
      'currentMode',
      'rangedTiles',
      'rollValue'
    ]),
    ...mapState('tiles', [
      'tiles'
    ]),
    ...mapState('players', [
      'players'
    ])
  },
  methods: {
    ...mapMutations('players', [
      PLAYERS_SET_PLAYERS
    ]),
    ...mapActions('tiles', [
      'setupBoard',
      'setupBlockedTiles',
      'controlTiles'
    ]),

    ...mapActions('turn', [
      'selectPlayer'
    ]),

    startGame () {
      this.setupBoard()
      this.setupBlockedTiles(this.blockedTileCount)

      this.PLAYERS_SET_PLAYERS(
        [{
          name: 'Player 1',
          colour: 'red',
          isComputer: false,
          index: 1
        },
        {
          name: 'Player 2',
          colour: 'blue',
          isComputer: true,
          index: 2
        }]
      )

      this.controlTiles({
        empire: 'Player 1',
        hitPoints: parseInt(this.startingPoints),
        tiles: [34, 44, 54, 64]
      })

      this.controlTiles({
        empire: 'Player 2',
        hitPoints: parseInt(this.startingPoints),
        tiles: [37, 47, 57, 67]
      })

      this.selectPlayer(this.players[0])

      this.$router.push({ path: '/play' })
    }
  }
}
</script>

<style scoped lang="scss">
.c-setup {
  color: white;

  label {
    display: block;
  }
}
</style>
