<template>
  <Input
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    @blur="handleBlur"
  />
</template>
<script setup>
import { useFieldContext } from '@/components/common/form/cFieldContext.js'
import { Input } from '@/components/ui/input'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  }
})
const emit = defineEmits(['update:modelValue'])

const {handleBlur} = useFieldContext()
</script>
