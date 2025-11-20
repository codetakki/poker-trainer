<template>
  <v-card
    ref="card"
    class="pa-4 d-flex flex-column bg-white rounded-xl"
    height="100%"
    style="aspect-ratio: 1/1.5;"
    variant="outlined"
  >
    <div class="d-flex justify-start">
      <v-icon :color="cardColor" :icon="suitIcon" :size="cardHeight*.25" />
    </div>
    <div class="d-flex align-center justify-center flex-grow-1 h-100">
      <v-icon
        class="align-center"
        :color="cardColor"
        :icon="valueIcon"
        :size="cardHeight * .5"
      />
    </div>
    <div class="d-flex justify-end">
      <v-icon :color="cardColor" :icon="suitIcon" :size="cardHeight*.25" />
    </div>

  </v-card>

</template>

<script setup lang="ts">
  import type { PokerCard } from '@/types'
  import { useElementSize } from '@vueuse/core'
  import { computed, ref, useTemplateRef } from 'vue'
  import { faceCards } from '@/types'
  const props = defineProps<PokerCard>()
  const card = useTemplateRef('card')
  const { height: cardHeight } = useElementSize(card)

  const valueIcon = computed(() => {
    if (faceCards.includes(props.value as typeof faceCards[number])) {
      return 'mdi-alpha-' + props.value.toLowerCase()
    }
    return 'mdi-numeric-' + props.value
  })
  const suitIcon = computed(() => {
    return 'mdi-cards-' + props.suit
  })
  const cardColor = computed(() => {
    if (props.suit == 'diamond' || props.suit == 'heart') return 'red'

    return 'black'
  })
</script>
