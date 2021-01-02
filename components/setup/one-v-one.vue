<template>
  <div>
    <h2>Split Screen Multiplayer</h2>
    <p>Take on a friend on the same device in a one versus one format.</p>
    <button class="c-menu-button" @click="play()">
      <c-icon icon="play-circle" />
      Start Split Screen
    </button>
  </div>
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

    play () {
      this.setupBoard()
      this.setupBlockedTiles(25)

      this.PLAYERS_SET_PLAYERS(
        [{
          name: 'You',
          colour: 'red',
          isComputer: false,
          index: 1
        },
        {
          name: 'Player 2',
          colour: 'blue',
          isComputer: false,
          index: 2
        }]
      )

      this.controlTiles({
        empire: 'You',
        hitPoints: 3,
        tiles: [34, 44, 54, 64]
      })

      this.controlTiles({
        empire: 'Player 2',
        hitPoints: 3,
        tiles: [37, 47, 57, 67]
      })

      this.selectPlayer(this.players[0])

      this.$router.push({ path: '/play' })
    }
  }
}
</script>
