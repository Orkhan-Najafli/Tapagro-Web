<template>
  <div>
    <svg
      :width="props.size.width"
      :height="props.size.height"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Icon/Outline/scale">
        <path
          id="Icon"
          d="M3 6L6 7M6 7L3 16C4.77253 17.3334 7.22866 17.3334 9.00119 16M6 7L9.00006 16M6 7L12 5M18 7L21 6M18 7L15 16C16.7725 17.3334 19.2287 17.3334 21.0012 16M18 7L21.0001 16M18 7L12 5M12 3V5M12 21V5M12 21H9M12 21H15"
          :stroke="props.color"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  </div>
</template>
<script setup>
const props = defineProps({
  color: {
    type: String,
    default: "#334155",
  },
  size: {
    type: Object,
    default: { width: "24px", height: "24px" },
  },
});
</script>
