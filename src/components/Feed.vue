<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <slot />
      </v-col>

      <feed-card
        v-for="(article, i) in paginatedArticles"
        :key="i"
        :size="layout[i]"
        :value="article"
      />
    </v-row>

    <v-row align="center">
      <v-col cols="3">
        <base-btn
          v-if="page !== 1"
          class="ml-0"
          square
          :title="$t('pagination.prev')"
          @click="page--"
        >
          <v-icon>$chevronLeft</v-icon>
        </base-btn>
      </v-col>

      <v-col
        class="text-center subheading"
        cols="6"
      >
        {{ $t('pagination.page_of', { page: page, pages: pages }) }}
      </v-col>

      <v-col
        class="text-right"
        cols="3"
      >
        <base-btn
          v-if="pages > 1 && page < pages"
          class="mr-0"
          square
          :title="$t('pagination.next')"
          @click="page++"
        >
          <v-icon>$chevronRight</v-icon>
        </base-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  // Utilities
  import {
    mapGetters,
  } from 'vuex'

  export default {
    name: 'Feed',

    components: {
      FeedCard: () => import('@/components/FeedCard'),
    },

    data: () => ({
      layout: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      page: 1,
    }),

    computed: {
      ...mapGetters({ articles: 'articles' }),
      pages () {
        return Math.ceil(this.articles.length / 9)
      },
      paginatedArticles () {
        const start = (this.page - 1) * 9
        const stop = this.page * 9

        return this.articles.slice(start, stop)
      },
    },

    watch: {
      page () {
        window.scrollTo(0, 0)
      },
    },
  }
</script>
