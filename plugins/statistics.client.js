import { Connection, Counter, HitCounter } from 'micro-stat'

export default function (context, inject) {
  Connection.connect('42250c66-6853-47df-85c3-b38e1af54bbb')

  const statistics = {
    Counter,
    HitCounter
  }

  const myCounter = new HitCounter('Website Loaded')
  myCounter.publish()

  inject('statistics', statistics)
}
