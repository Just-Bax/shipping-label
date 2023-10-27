<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { ref } from 'vue';

  import HeaderBlock from '../components/HeaderBlock.vue';
  import DataBlock from '../components/DataBlock.vue';

  const get_data = (query: any, commands: any) => {
    const data = Object.fromEntries(
      Object.entries(query).filter(([key]) => !commands.includes(key)).sort((a, b) => a[0].localeCompare(b[0]))
    );
    return data;
  };

  const route = useRoute();
  const commands = ['delimiter'];
  const data = get_data(route.query, commands);
  const delimiter = String(route.query.delimiter);
</script>

<template>
  <div class="relative bg-white h-[1200px] p-3"> 
    <div class="absolute w-full h-full grid 2xl:grid-cols-7 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 grid-rows-8 gap-3">
      <div class="absolute w-full h-[90%] grid 2xl:grid-cols-7 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 grid-rows-8 gap-3">
        <div v-for="(value, key) in data" :key="key" class="cell bg-[#ECEFF1] border border-[#CFD8DC] col-span-1 row-span-1">
          <HeaderBlock :height="'h-14'" :title="String(value).split(delimiter)[0]" :side="'left'" :size="'text-[22px]'"/>
          <DataBlock :height="'h-14'" :data="String(value).split(delimiter)[1]" :side="'right'" :size="'text-[36px]'" :icon_size="'w-10 h-10'"/>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- http://localhost:5173/?height=1500px&delimiter=-&a=Test-40&b=Test-9&c=Test-12 -->