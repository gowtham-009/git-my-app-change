<template>
  <div>
    <div class="w-full p-1 flex gap-2 items-end" >
     <div>
      <div class="text-slate-500">Statement For</div>
      <div class="text-black-500"><span>{{ startdate }}</span> To <span>{{ enddate }}</span></div>
     </div>
      <div>
        <Popover class="relative">
          <PopoverButton class="inline-flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900 border rounded-lg p-1">

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>

          </PopoverButton>

          <transition  enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" style="border: 1px solid red;"
            enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
            <PopoverPanel class="absolute left-1/2 z-10 mt-2 flex w-screen max-w-max -translate-x-1/2 px-4">
              <div
                class="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm/6 shadow-lg ring-1 ring-gray-900/5">
                <div class="p-4">
                  <span class="text-lg"><i class="pi pi-clock"></i> Frequently used time period</span>
                  <div class="w-full p-1 flex gap-2 pl-5">
                    <button type="button" @click="getdata('days_7', 'none')"
                      class="rounded-md  px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">7
                      Days</button>
                    <button type="button" @click="getdata('days_15')"
                      class="rounded-md   px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">15
                      Days</button>
                    <button type="button" @click="getdata('month_1')"
                      class="rounded-md  px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">1
                      Month</button>
                    <button type="button" @click="getdata('months_3')"
                      class="rounded-md  px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">3
                      Months</button>
                  </div>

                  <div class="mt-3">
              <span class="text-lg "><i class="pi pi-calendar"></i> Date Range Filter</span>
              <div class="flex justify-center items-center gap-2">
                <div class="w-48">
                    <span>Start Date</span><br>
                    <DatePicker  v-model="start" dateFormat="dd-mm-yy" showIcon />
                </div>
                <span>To</span>
                <div class="w-48">
                    <span>End Date</span><br>
                    <DatePicker v-model="end" dateFormat="dd-mm-yy" showIcon />
                </div>
            </div>
             </div>
            <div class="w-full flex justify-start mt-2">
              <button @click="getdata('daterangefilter')" class="text-white bg-indigo-600 py-1 px-2 rounded-lg">Apply filter</button>
            </div>
                </div>

              </div>
            </PopoverPanel>
          </transition>
        </Popover>
      </div>

    </div>
    <div class="w-full p-1 mt-2" ></div>
    <div class="w-full p-1 mt-2" >

      <DataTable v-model:filters="filters" :value="customers" paginator :rows="10" removableSort dataKey="id"
        filterDisplay="menu" :loading="loading" :globalFilterFields="['stockname', 'quantity']"
        tableStyle="min-width: 50rem">

        <template #header>
          <div class="flex justify-end gap-2 items-center">

            <IconField>
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
            </IconField>

            <MultiSelect v-model="selectedColumns" :options="columns" optionLabel="header"
              @change="updateVisibleColumns" display="template" :showToggleAll="false" :dropdownIcon="null"
              class="p-0 text-white ml-2" style="width: 40px; height: 34px; ">

              <template #dropdownicon>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                  class="w-6 h-6 text-slate-500">
                  <path fill-rule="evenodd"
                    d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 18.375V5.625ZM21 9.375A.375.375 0 0 0 20.625 9h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5ZM10.875 18.75a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5ZM3.375 15h7.5a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375Zm0-3.75h7.5a.375.375 0 0 0 .375-.375v-1.5A.375.375 0 0 0 10.875 9h-7.5A.375.375 0 0 0 3 9.375v1.5c0 .207.168.375.375.375Z"
                    clip-rule="evenodd" />
                </svg>

              </template>

              <template #footer v-if="showReset">
                <button type="button" @click="resetColumns"
                  class="rounded-md w-full bg-indigo-600 px-2 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Reset</button>

              </template>
            </MultiSelect>
            <button type="button" @click="exportCSV($event)"
              class="rounded-md ml-2  px-1 py-1 text-sm font-semibold text-slate-500  border-2"><svg
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path fill-rule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z"
                  clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </template>
        <template #empty> No customers found. </template>
        <template #loading> Loading customers data. Please wait. </template>

        <Column class="cursor-pointer" v-if="visibleColumns.includes('stockname')" sortable field="stockname"
          header="Stockname">
          <template #body="{ data }">
            {{ data.stockname }}
          </template>
          <template #filter="{ filterModel }">
            <InputText v-model="filterModel.value" type="text" placeholder="Search by name" />
          </template>
        </Column>
        <Column class="cursor-pointer" v-if="visibleColumns.includes('quantity')" sortable field="quantity"header="Quantity"  :showFilterOperator="false" :showFilterMatchModes="false">
          <template #body="{ data }">
            <span> {{ data.quantity }}</span>
          </template>
          <template #filter="{ filterModel }">
            <Slider v-model="filterModel.value" range class="m-4" :min="1" :max="1000"></Slider>
            <div class="flex items-center justify-between px-2">
              <span>{{ filterModel.value ? filterModel.value[0] : 0 }}</span>
              <span>{{ filterModel.value ? filterModel.value[1] : 100 }}</span>
            </div>
          </template>
        </Column>

        <Column class="cursor-pointer"  v-if="visibleColumns.includes('date')"  sortable field="date" header="Date"  :showFilterOperator="false" :showFilterMatchModes="false">
          <template #body="{ data }">
            <span>{{ formatDatee(data.date) }}</span>
           
          </template>
          <template #filter="{ filterModel }">
            <DatePicker v-model="filters.date.constraints[0].value" dateFormat="dd-mm-yy" showIcon
              @update:modelValue="applyDateFilter" />
          </template>
        </Column>
        <Column class="cursor-pointer"  v-if="visibleColumns.includes('avgprice')"  sortable field="avgprice" header="Avgprice"  :showFilterOperator="false" :showFilterMatchModes="false">
          <template #body="{ data }">
            <span>{{ data.avgprice }}</span>
          </template>
          <template #filter="{ filterModel }">
            <Slider v-model="filterModel.value" range class="m-4" :min="1" :max="1000"></Slider>
            <div class="flex items-center justify-between px-2">
              <span>{{ filterModel.value ? filterModel.value[0] : 0 }}</span>
              <span>{{ filterModel.value ? filterModel.value[1] : 100 }}</span>
            </div>
          </template>
        </Column>
        <Column class="cursor-pointer"  v-if="visibleColumns.includes('ltp')"  sortable field="ltp" header="LTP"  :showFilterOperator="false" :showFilterMatchModes="false">
          <template #body="{ data }">
            <span> {{ data.ltp }}</span>
          </template>
          <template #filter="{ filterModel }">
            <Slider v-model="filterModel.value" range class="m-4" :min="1" :max="1000"></Slider>
            <div class="flex items-center justify-between px-2">
              <span>{{ filterModel.value ? filterModel.value[0] : 0 }}</span>
              <span>{{ filterModel.value ? filterModel.value[1] : 100 }}</span>
            </div>
          </template>
        </Column>
        <Column class="cursor-pointer"  v-if="visibleColumns.includes('invamt')" sortable field="invamt" header="INV"  :showFilterOperator="false" :showFilterMatchModes="false">
          <template #body="{ data }">
            <span>{{ data.invamt }}</span>
          </template>
          <template #filter="{ filterModel }">
            <Slider v-model="filterModel.value" range class="m-4" :min="1" :max="100000"></Slider>
            <div class="flex items-center justify-between px-2">
              <span>{{ filterModel.value ? filterModel.value[0] : 0 }}</span>
              <span>{{ filterModel.value ? filterModel.value[1] : 100 }}</span>
            </div>
          </template>
        </Column>
        <Column class="cursor-pointer"  v-if="visibleColumns.includes('mktval')"  field="mktval" sortable header="Mktval":showFilterOperator="false" :showFilterMatchModes="false">
          <template #body="{ data }">
            <span>{{ data.mktval }}</span>
          </template>
          <template #filter="{ filterModel }">
            <Slider v-model="filterModel.value" range class="m-4" :min="1" :max="100000"></Slider>
            <div class="flex items-center justify-between px-2">
              <span>{{ filterModel.value ? filterModel.value[0] : 0 }}</span>
              <span>{{ filterModel.value ? filterModel.value[1] : 100 }}</span>
            </div>
          </template>
        </Column>
        <Column class="cursor-pointer"  v-if="visibleColumns.includes('overall')" sortable field="overall"header="Overall"  :showFilterOperator="false" :showFilterMatchModes="false">
          <template #body="{ data }">
            <span>{{ data.overall }}</span>
          </template>
          <template #filter="{ filterModel }">
            <Slider v-model="filterModel.value" range class="m-4" :min="1" :max="10000"></Slider>
            <div class="flex items-center justify-between px-2">
              <span>{{ filterModel.value ? filterModel.value[0] : 0 }}</span>
              <span>{{ filterModel.value ? filterModel.value[1] : 100 }}</span>
            </div>
          </template>
        </Column>
        <Column class="cursor-pointer"  v-if="visibleColumns.includes('days')"  sortable field="days" header="Days"  :showFilterOperator="false" :showFilterMatchModes="false">
          <template #body="{ data }">
            <span> {{ data.days }}</span>
          </template>
          <template #filter="{ filterModel }">
            <Slider v-model="filterModel.value" range class="m-4" :min="1" :max="1000"></Slider>
            <div class="flex items-center justify-between px-2">
              <span>{{ filterModel.value ? filterModel.value[0] : 0 }}</span>
              <span>{{ filterModel.value ? filterModel.value[1] : 100 }}</span>
            </div>
          </template>
        </Column>

      </DataTable>

    </div>
  </div>
</template>

<script setup>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/vue/20/solid'
import { ArrowPathIcon, ChartPieIcon, CursorArrowRaysIcon, FingerPrintIcon, SquaresPlusIcon, } from '@heroicons/vue/24/outline'
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';


const formatDatee = (dateString) => {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year.slice(-4)}`; // Convert yy-mm-dd to dd-mm-yy
};

const start=ref('')
const end=ref('')
const startdate = ref('0')
const enddate = ref('0')
const customers = ref([]);
const filters = ref();
const getdata = async (data_filter, panel) => {
  
  if (data_filter === 'daterangefilter') {
    flylayout.value=false
  // Function to format date as dd-mm-yyyy
  const formatDate = (date) => {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const yyyy = date.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  // Convert input values to Date objects
  const startDate = new Date(start.value);
  let endDate = new Date(end.value);
  endDate.setHours(23, 59, 59, 999); // Ensure we include the full last day

  try {
    const res = await fetch('/peryear.json');
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

    const data = await res.json();

    if (startDate && endDate) {
      // Log formatted startDate and endDate
      startdate.value=formatDate(startDate)
      enddate.value= formatDate(endDate)
    
      // Filter data based on the date range
      const filteredData = data.filter(item => {
        const itemDate = new Date(item.date); // Assuming JSON has a "date" field
        return itemDate >= startDate && itemDate <= endDate;
      });

      customers.value = filteredData;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}





 else{
  try {
    const res = await fetch('/filterdata.json');
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const data = await res.json()
    if (data_filter == 'days_7') {
      if(panel=='none'){
        
      }
      customers.value = data[0].days_7
     
      enddate.value = new Date().toLocaleDateString('en-GB').replace(/\//g, '-');
      startdate.value = new Date(new Date().setDate(new Date().getDate() - 6))

     
  .toLocaleDateString('en-GB')
  .replace(/\//g, '-');

  start.value= startdate.value
  end.value= enddate.value
       
    }
    else if (data_filter == 'days_15') {
 
      customers.value = data[0].days_15
     
      enddate.value = new Date().toLocaleDateString('en-GB').replace(/\//g, '-');
      startdate.value = new Date(new Date().setDate(new Date().getDate() - 14))
  .toLocaleDateString('en-GB')
  .replace(/\//g, '-');
  start.value= startdate.value
  end.value= enddate.value
    }
    else if (data_filter == 'month_1') {
  
      customers.value = data[0].month_1
      enddate.value = new Date().toLocaleDateString('en-GB').replace(/\//g, '-');

let prevMonthDate = new Date();
prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);

startdate.value = prevMonthDate.toLocaleDateString('en-GB').replace(/\//g, '-');

start.value= startdate.value
  end.value= enddate.value

    }
    else if (data_filter == 'months_3') {
    
      customers.value = data[0].months_3
      enddate.value = new Date().toLocaleDateString('en-GB').replace(/\//g, '-');

let prevThreeMonthsDate = new Date();
prevThreeMonthsDate.setMonth(prevThreeMonthsDate.getMonth() - 3);

startdate.value = prevThreeMonthsDate.toLocaleDateString('en-GB').replace(/\//g, '-');
start.value= startdate.value
  end.value= enddate.value

    }


  } catch (error) {
    console.error('Error:', error.message);
  }
 }
};

onMounted(() => {
  getdata('days_7');
});

const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    stockname: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    quantity: { value: [0, 1000], matchMode: FilterMatchMode.BETWEEN },
     avgprice: { value: [0, 1000], matchMode: FilterMatchMode.BETWEEN },
    ltp: { value: [0, 1000], matchMode: FilterMatchMode.BETWEEN },
    invamt: { value: [0, 100000], matchMode: FilterMatchMode.BETWEEN },
    mktval: { value: [0, 100000], matchMode: FilterMatchMode.BETWEEN },
    overall: { value: [0, 10000], matchMode: FilterMatchMode.BETWEEN },
    days: { value: [0, 1000], matchMode: FilterMatchMode.BETWEEN },
    date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },

  };
};

const applyDateFilter = () => {
  if (filters.value.date.constraints[0].value) {
    let selectedDate = filters.value.date.constraints[0].value;
    filters.value.date.constraints[0].value = formatDate(selectedDate);
  }
};

const formatDate = (date) => {
  if (!date) return null;
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

initFilters();


const columns = ref([
  { field: 'stockname', header: 'Stockname' },
  { field: 'quantity', header: 'Quantity' },
  { field: 'avgprice', header: 'Avgprice' },
  { field: 'ltp', header: 'Ltp' },
  { field: 'invamt', header: 'Invamt' },
  { field: 'mktval', header: 'Mktval' },
  { field: 'overall', header: 'Overall' },
  { field: 'days', header: 'Days' },
  { field: 'date', header: 'Date' },

]);
//Initially select all columns except 'ltp', 'mktval', and 'date'
const selectedColumns = ref(columns.value.filter(col => !['ltp', 'mktval', 'date'].includes(col.field)));
const visibleColumns = ref(selectedColumns.value.map(col => col.field)); // Tracks visibility
const showReset = ref(true); // Ensure reset is visible as some columns are unchecked initially

const updateVisibleColumns = () => {
  visibleColumns.value = selectedColumns.value.map(col => col.field);
  showReset.value = selectedColumns.value.length < columns.value.length; // Show Reset only when some columns are unchecked
};

const resetColumns = () => {
  selectedColumns.value = columns.value.slice(); // Reset to all columns selected
  updateVisibleColumns(); // Ensure UI updates
};

watch(selectedColumns, updateVisibleColumns, { deep: true });

const dt = ref()
const exportCSV = () => {
  dt.value.exportCSV();
};
</script>

<style>
.left-1\/2 {
  left: 500% !important;
}
</style>