<script lang="ts">
	import Categories from '$lib/components/Categories.svelte';
	import { Github, Linkedin, Filter } from 'svelte-feathers';

    let currentCategory = $state(0)
</script>

<div class="flex w-full flex-col gap-5 ~max-w-[21.25rem]/6xl">
	<!-- Header Section  -->
	<div class="flex justify-between">
		<div
			class="flex size-full max-w-[36.313rem] flex-col place-items-center gap-2.5 px-2.5 lg:place-items-start lg:px-0"
		>
			<h1 class="font-bold ~text-2xl/3xl">Hello, Welcome to my blog!</h1>
			<h4 class="text-center ~text-lg/xl lg:text-start">
				I am Mordechai, a sponsored open-source software engineer.
			</h4>
			<p class="text-center ~text-sm/base lg:text-start">
				Here I will write about many different programming related topics, but might expand beyond
				programming.
			</p>
		</div>
		<div class="hidden flex-col gap-3 place-self-end lg:flex">
			<Github />
			<Linkedin />
		</div>
	</div>

	<!-- Sorting Section -->
	<div class="flex size-full justify-between px-2.5 lg:place-content-center">
		<div class="flex gap-3 lg:hidden">
			<Github />
			<Linkedin />
		</div>
		<Filter class="lg:hidden" />
		<Categories bind:currentCategory class="hidden lg:flex" />
	</div>
</div>
