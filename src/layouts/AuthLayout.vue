<template>
  <div
    class="flex h-screen flex-col items-center justify-center gap-6 bg-accent/20 p-6 md:p-10"
  >
    <div class="-mt-24 flex w-full max-w-sm flex-col gap-6">
      <RouterView name="auth"></RouterView>
    </div>
  </div>
</template>
