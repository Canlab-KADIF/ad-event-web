<template>
	<div>
		<!-- <div class="page-list">
      <chevrons-left-icon
        class="left-icon"
        v-if="pageSet.first !== null"
        color="#dfdfdf"
        @click="pageSet.first !== null ? sendPage(pageSet.first) : ''"
      />
      <ul>
        <li
          :class="{ active: page === pageSet.currentPage }"
          v-for="page in pageSet.list"
          :key="page"
          @click="sendPage(page)"
        >
          {{ page }}
        </li>
      </ul>
      <chevrons-right-icon
        class="right-icon"
        v-if="pageSet.end !== null"
        color="#dfdfdf"
        @click="pageSet.end !== null ? sendPage(pageSet.end) : ''"
      />
    </div> -->
		<nav>
			<ul class="pagination">
				<li v-if="page > pageScale">
					<a href="#/gn/sy/user/010200" @click="pageMove(1)"
						><i class="fa fa-angle-double-left"></i
					></a>
				</li>
				<li v-if="page > 1">
					<a @click="pageMove(page - 1)"><i class="fa fa-angle-left"></i></a>
				</li>
				<li :class="{ active: page === pg }" v-for="pg in pageList">
					<a @click="pageMove(pg)">{{ pg }}</a>
				</li>
				<li v-if="page < totalPage">
					<a><i class="fa fa-angle-right"></i></a>
				</li>
				<li v-if="endPageBtn === true">
					<a @click=""><i class="fa fa-angle-double-right"></i></a>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script>
export default {
	props: ['pageSet'],

	components: {},
	methods: {
		// sendPage(page) {
		//   this.$emit("paging", page)
		// }
	},
};
</script>
