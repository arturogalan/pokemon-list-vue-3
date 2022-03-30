<template>
    <label 
        v-show="hasLabel"
        :for="inputName"
    >
        {{ inputName }}
    </label>
    <input
        v-bind="$attrs"
        :name="inputName"
        :id="inputName"
        :type="inputType" 
    />
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
    hasLabel: {
        type: Boolean,
        default: false
    },
    inputName: {
        type: String,
        default: 'baseLabel'
    },
    inputType: String
})

</script>