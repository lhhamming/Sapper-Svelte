<script>

import {onMount} from "svelte";
import {getTokenPayload, getItemsSearch, resetToken} from "../routes/util";
	import {setContext} from 'svelte';

	let searchedItems = [];


	export let segment;
	let userToken
	onMount( () =>{
		userToken = getTokenPayload();
	})

	setContext('SearchedItems', {
		getItemsSearch
	})

	function searchForItem(event) {
		event.preventDefault()
		console.log('Searching for items')
		const searchField = document.querySelector('input[type="text"]')
		const searchFieldValue = searchField.value
		getItemsSearch(searchFieldValue).then(foundItems =>{
			searchedItems.push(foundItems)
		})
	}

	function logout(){
		resetToken()
		window.location.href='/'
	}


</script>

<style>
	nav {
		border-bottom: 1px solid rgba(255,62,0,0.1);
		font-weight: 300;
		padding: 0 1em;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(255,62,0);
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
</style>

<nav>
	<ul>
		<li><a aria-current="{segment === undefined ? 'page' : undefined}" href=".">home</a></li>
		{#if userToken}
			<li><a aria-current="{segment === 'bids' ? 'page' : undefined}" href="bids">Bids</a></li>
			{#if userToken.roles.includes('admin')}
				<li><a aria-current="{segment === 'administration' ? 'page' : undefined}" href="administration">Administration</a></li>
			{/if}
			<li><a aria-current="{segment === 'logout' ? 'page' : undefined}" on:click={() => logout()} href=".">Logout</a></li>
		{:else}
			<li><a aria-current="{segment === 'login' ? 'page' : undefined}" href="login">Login</a></li>
		{/if}
		<li style="float: right">
			<form>
				<input type="text" placeholder="search..." >
				<button on:click={() => searchForItem(event)}> Search</button>
			</form>
		</li>
	</ul>
</nav>
