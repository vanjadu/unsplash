<script lang="ts">
  import Footer from '../components/Footer.svelte'
  import Header from '../components/Header.svelte'
  import '../styles/globals.css'
</script>

<svelte:head>
  <title>
    Beautiful Free Images & Pictures | Unsplash
  </title>
</svelte:head>

<Header />
<slot />
<Footer />