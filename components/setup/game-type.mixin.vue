<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { PLAYERS_SET_PLAYERS, SETTINGS_SET_COMPUTER_SPEED } from '@/store/mutations.constants'

export default {
  computed: {
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

    ...mapMutations('settings', [
      SETTINGS_SET_COMPUTER_SPEED
    ]),

    ...mapActions('tiles', [
      'setupBoard',
      'setupBlockedTiles',
      'controlTiles'
    ]),

    ...mapActions('turn', [
      'selectPlayer'
    ])
  }
}
</script>
