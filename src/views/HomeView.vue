<script setup lang="ts">
import SingersArchive from '@/components/SingersArchive.vue';
import SingersCategoryList from '@/components/SingersCategoryList.vue';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <main>
    <div class="container">
      <div class="mt-5 mb-15 md:mb-17.5 lg:mb-25 lg:mt-15">
        <h1 class=" tracking-tighter max-w-184.25 text-[41px]/[100%] sm:text-[62px]/[100%] lg:text-[70px]/[100%]">
          {{ t('home.title') }}
        </h1>
      </div>

      <SingersCategoryList />
      <SingersArchive />

    </div>
  </main>
</template>
