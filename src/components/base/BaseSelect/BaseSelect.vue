<template>
    <label 
        v-show="hasLabel"
        :for="selectName"
    >
        {{ selectName }}
    </label>
    <select 
        :name="selectName"
        :id="selectName"
        v-bind="$attrs"
    >
        <option
            v-for="option in options"
            :key="option.id"
            :value="option.value"
        >
            {{ option.label }}
        </option>
    </select>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
    hasLabel: {
        type: Boolean,
        default: false
    },
    selectName: {
        type: String,
        default: 'baseLabel'
    },
    options: Object
})

</script>