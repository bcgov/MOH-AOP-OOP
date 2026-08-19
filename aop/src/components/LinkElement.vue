<template>
  <li class="nav-item m-1">
    <a
      class="nav-link"
      :href="url"
      target="_blank"
      rel="noopener noreferrer"
    >
      {{ label }}
    </a>
  </li>
</template>

<script>
  import "@bcgov/bootstrap-v5-theme/css/bootstrap-theme.min.css";
  export default {
    name: 'LinkElement',
    props: {
      url: String,
      label: String,
    }
  }
</script>
