<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { ref } from 'vue';
  import axios from 'axios';

  const get_data = async (domain: string, token: string, trackor_type: string, view: string, key_value: number) => {
    try {
      const response = await axios.get(`https://${domain}/api/v3/trackor_types/${trackor_type}/trackors`, {
        params: { 'view': view, 'TRACKOR_ID': key_value, 'page': '1', 'per_page': '100000' },
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data[0];
    } catch (error) {
      console.error(error);
    }
  }

  const collect_data = async () => {
    data.value = await get_data(domain, token, 'ITEM', 'G:Product label', key_value);
    is_load.value = true;
  };

  const print = (btn: any) => {
    btn!.style.display = 'none'; 
    window.print(); 
    btn!.style.display = 'block'; 
   };

  interface ItemData {
    "TRACKOR_ID": number;
    "MASTERPARTLIST.IPR_BARCODE": string | null;
    "MASTERPARTLIST.MPL_PART_NUMBER": string | null;
    "ITM_SERIAL_NUMBER": null | string;
    "MASTERPARTLIST.IPR_NAME": string | null;
    "MASTERPARTLIST.MPL_UOM": string | null;
    "MASTERPARTLIST.TRACKOR_CLASS_ID": string | null;
    "MASTERPARTLIST.IPR_SIZE_TYPE": string | null;
    "PO_Line.POL_UNIT_PRICE": string | null;
    "PO_Line.TRACKOR_KEY": string | null;
    "PO_Line.POL_COST_CATEGORY": string | null;
    "ITM_QR_CODE": { data: string | null; file_name: string | null; };
    "ITM_BARCODE": { data: string | null; file_name: string | null; };
  }

  const route = useRoute();
  const domain = String(route.query.domain);
  const token = String(route.query.token);
  const key_value = Number(route.query.key_value);
  const is_load = ref(false);
  const data = ref<ItemData | null>(null);
  collect_data();
</script>

<template>
  <div class="main w-screen h-[calc(100vh-70px)] p-3">
    <div class="flex justify-between items-center">
      <div class="flex flex-col justify-between w-[200px] h-[290px] rounded overflow-none">
        <div class="w-full h-[200px] border-2 border-[#607D8B] rounded overflow-none p-1">
          <img v-if="data?.ITM_QR_CODE.data" class="w-full h-full" :src="`data:image/png;base64,${data?.ITM_QR_CODE.data}`">
          <div v-else class="w-full h-full flex justify-center items-center bg-[#b5b5b54D]">
            <span v-if="is_load" class="font-semibold text-[#607D8B]">No Qrcode</span>
            <span v-else class="font-semibold text-[#607D8B]">Loading..</span>
          </div>        
        </div>
        <div class="w-full h-[80px] border-2 border-[#607D8B] rounded overflow-none p-1">
          <img v-if="data?.ITM_BARCODE.data" class="w-full h-full" :src="`data:image/png;base64,${data?.ITM_BARCODE.data}`">
          <div v-else class="w-full h-full flex justify-center items-center bg-[#b5b5b54D]">
            <span v-if="is_load" class="font-semibold text-[#607D8B]">No Barcode</span>
            <span v-else class="font-semibold text-[#607D8B]">Loading..</span>
          </div>
        </div>
      </div>
      <div class="flex w-[calc(100%-210px)] h-[290px] border-2 border-[#607D8B] rounded overflow-none">
        <div v-if="is_load" class="w-full flex flex-col px-3 py-1 text-[20px]">
          <div><span class="font-semibold mr-2">Master part list code:</span><span class="font-normal">{{ data?.['MASTERPARTLIST.IPR_BARCODE'] }}</span></div>
          <div><span class="font-semibold mr-2">Master part list name:</span><span class="font-normal">{{ data?.['MASTERPARTLIST.IPR_NAME'] }}</span></div>
          <div><span class="font-semibold mr-2">Equipment Type:</span><span class="font-normal">{{ data?.['MASTERPARTLIST.TRACKOR_CLASS_ID'] }}</span></div>
          <div><span class="font-semibold mr-2">Unit of measure:</span><span class="font-normal">{{ data?.['MASTERPARTLIST.MPL_UOM'] }}</span></div>
          <div><span class="font-semibold mr-2">Size:</span><span class="font-normal">{{ data?.['MASTERPARTLIST.IPR_SIZE_TYPE'] }}</span></div>
          <div><span class="font-semibold mr-2">Serial number:</span><span class="font-normal">{{ data?.['ITM_SERIAL_NUMBER'] }}</span></div>
          <div><span class="font-semibold mr-2">Purchase order line number:</span><span class="font-normal">#{{ data?.['PO_Line.TRACKOR_KEY'] }}</span></div>
          <div><span class="font-semibold mr-2">Unit price:</span><span class="font-normal">${{ data?.['PO_Line.POL_UNIT_PRICE'] }}</span></div>
          <div><span class="font-semibold mr-2">Cost category:</span><span class="font-normal">{{ data?.['PO_Line.POL_COST_CATEGORY'] }}</span></div>
        </div>
        <div v-else class="w-full flex justify-center items-center">
          <span class="font-semibold text-[#607D8B]">Loading..</span>
        </div>
      </div>
    </div>
  </div>
  <div class="w-screen h-[70px] flex justify-center items-center">
    <button @click="print($event.target)" id="print_btn" class="bg-[#CFD8DC] text-[#607D8B] font-semibold rounded py-2 px-5">Print</button>
  </div>
</template>