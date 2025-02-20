<template>
    <Toast />
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

          <transition  enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" 
            enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
            <PopoverPanel v-slot="{ close }" class="absolute left-1/2 z-10 mt-2 flex w-screen max-w-max -translate-x-1/2 px-4">
              <div
                class="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm/6 shadow-lg ring-1 ring-gray-900/5">
                <div class="p-4">
                  <span class="text-lg"><i class="pi pi-clock"></i> Frequently used time period</span>
                  <div class="w-full p-1 flex gap-2 pl-5">
                    <button type="button" :class="{ 'bg-indigo-500 text-white': activedata === 'days_7' }" @click="getdata('days_7', close)" 
                      class="rounded-md  px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">7
                      Days</button>
                    <button type="button" :class="{ 'bg-indigo-500 text-white': activedata === 'days_15' }" @click="getdata('days_15', close)"
                      class="rounded-md   px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">15
                      Days</button>
                    <button type="button" :class="{ 'bg-indigo-500 text-white': activedata === 'month_1' }" @click="getdata('month_1', close)"
                      class="rounded-md  px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">1
                      Month</button>
                    <button type="button" :class="{ 'bg-indigo-500 text-white': activedata === 'months_3' }" @click="getdata('months_3', close)"
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
              <button @click="getdata('daterangefilter', close)" class="text-white bg-indigo-600 py-1 px-2 rounded-lg">Apply filter</button>
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
           <span @click="rightcanva(data)">{{ data.stockname }}</span>
          </template>
          <template #filter="{ filterModel }">
            <InputText v-model="filterModel.value" type="text" placeholder="Search by name" />
          </template>
        </Column>
        <Column class="cursor-pointer" v-if="visibleColumns.includes('quantity')" sortable field="quantity"header="Quantity"  :showFilterOperator="false" :showFilterMatchModes="false">
          <template #body="{ data }">
            <span @click="rightcanva(data)"> {{ data.quantity }}</span>
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
            <span @click="rightcanva(data)">{{ formatDatee(data.date) }}</span>
           
          </template>
          <template #filter="{ filterModel }">
            <DatePicker v-model="filters.date.constraints[0].value" dateFormat="dd-mm-yy" showIcon
              @update:modelValue="applyDateFilter" />
          </template>
        </Column>
        <Column class="cursor-pointer"  v-if="visibleColumns.includes('avgprice')"  sortable field="avgprice" header="Avgprice"  :showFilterOperator="false" :showFilterMatchModes="false">
          <template #body="{ data }">
            <span @click="rightcanva(data)">{{ data.avgprice }}</span>
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
            <span @click="rightcanva(data)"> {{ data.ltp }}</span>
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
            <span @click="rightcanva(data)">{{ data.invamt }}</span>
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
            <span @click="rightcanva(data)">{{ data.mktval }}</span>
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
            <span @click="rightcanva(data)">{{ data.overall }}</span>
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
            <span @click="rightcanva(data)"> {{ data.days }}</span>
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

      
<Drawer v-model:visible="visibleRight" header="Stock Details" position="right" class="!w-90 md:!w-80 lg:!w-[80rem] wd" >


<hr>
<div class="w-full p-1 flex flex-col h-full justify-between" >
<div class="w-full flex wrap" >
  <div class="w-2/3 p-1 b-1"  >
    <Tabs value="0">
  <TabList >
      <Tab value="0"><i class="pi pi-asterisk"></i> Activity</Tab>
      <Tab value="1"><i class="pi pi-envelope"></i> Emails</Tab>
      <Tab value="2"><i class="pi pi-comment"></i> Comments</Tab>
      <Tab value="3"><i class="pi pi-database"></i> Data</Tab>
      <Tab value="4"><i class="pi pi-list-check"></i> Tasks</Tab>
      <Tab value="5"><i class="pi pi-clipboard"></i> Notes</Tab>
      <Tab value="6"><i class="pi pi-paperclip"></i> Attachments</Tab>
  </TabList>
  <TabPanels>
  <TabPanel value="0">
      Tab-0
  </TabPanel>
  <TabPanel value="1">
    Tab-1
  </TabPanel>
  <TabPanel value="2">
      Tab-2
  </TabPanel>
  <TabPanel value="3">
    Tab-3
  </TabPanel>
  <TabPanel value="4">
      Tab-4
  </TabPanel>
  <TabPanel value="5">
    Tab-5
  </TabPanel>
  <TabPanel value="6">
    Tab-6
  </TabPanel>
</TabPanels>
</Tabs>


  </div>
  <div class="w-1/3 p-1 b-1" style="border-left: 1px solid gray;">
    <p class="text-black-500 text-xl p-2 mt-3"><b>CRM-123H43</b></p>
    <hr>

    <div class="w-full flex justify-center items-center gap-3 p-2">
      <div class="rounded-full bg-slate-500 w-10 h-10"></div>
      <h1>{{ stockname }}</h1>
    </div>
    <hr>
    <div class="w-full mt-2">
      
    <Accordion value="0">
<AccordionPanel value="0">
    <AccordionHeader>Details</AccordionHeader>
    <AccordionContent>

      <div class="w-full  flex">
        <div class="w-full " ><span>Stock Name</span></div>
        <div class="w-full " ><span>{{stockname}}</span></div>
      </div>
      <div class="w-full  flex">
        <div class="w-full " ><span>Date</span></div>
        <div class="w-full " ><span>{{dateval}}</span></div>
      </div>
      <div class="w-full  flex">
        <div class="w-full " ><span>Quantity</span></div>
        <div class="w-full " ><span>{{quant}}</span></div>
      </div>
      <div class="w-full  flex">
        <div class="w-full " ><span>AVG Price</span></div>
        <div class="w-full " ><span>{{avg}}</span></div>
      </div>
      <div class="w-full  flex">
        <div class="w-full " ><span>LTP</span></div>
        <div class="w-full " ><span>{{ltp}}</span></div>
      </div>
      <div class="w-full  flex">
        <div class="w-full " ><span>INV Amount</span></div>
        <div class="w-full " ><span>{{invamt}}</span></div>
      </div>
      <div class="w-full  flex">
        <div class="w-full " ><span>MKT Value</span></div>
        <div class="w-full " ><span>{{mktval}}</span></div>
      </div>
      <div class="w-full  flex">
        <div class="w-full " ><span>Over All</span></div>
        <div class="w-full " ><span>{{overall}}</span></div>
      </div>
      <div class="w-full  flex">
        <div class="w-full " ><span>Days</span></div>
        <div class="w-full " ><span>{{days}}</span></div>
      </div>
     
       
    </AccordionContent>
</AccordionPanel>
</Accordion>
    </div>
  </div>

</div>



<div class="w-full p-1 flex justify-center gap-2" >
<Button label="Proceed" severity="success" @click="proceedfun" raised />
<Button label="Cancel" severity="danger" @click="cancelfun" variant="outlined" />
</div> 
</div>
</Drawer>

    </div>
  </div>
</template>

<script setup>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/vue/20/solid'
import { ArrowPathIcon, ChartPieIcon, CursorArrowRaysIcon, FingerPrintIcon, SquaresPlusIcon, } from '@heroicons/vue/24/outline'
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';
import { useToast } from "primevue/usetoast";

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

const activedata=ref('days_7')
const getdata = async (data_filter, close) => {

 

  if (data_filter === 'daterangefilter') {
    close()
  
  const formatDate = (date) => {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const yyyy = date.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  const startDate = new Date(start.value);
  let endDate = new Date(end.value);
  endDate.setHours(23, 59, 59, 999); 

  try {
    const res = await fetch('/peryear.json');
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

    const data = await res.json();

    if (startDate && endDate) {
      
      startdate.value=formatDate(startDate)
      enddate.value= formatDate(endDate)
    
      const filteredData = data.filter(item => {
        const itemDate = new Date(item.date);
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
      activedata.value='days_7'
      close()
      customers.value = data[0].days_7
     
      enddate.value = new Date().toLocaleDateString('en-GB').replace(/\//g, '-');
      startdate.value = new Date(new Date().setDate(new Date().getDate() - 6))

     
  .toLocaleDateString('en-GB')
  .replace(/\//g, '-');

  start.value= startdate.value
  end.value= enddate.value
       
    }
    else if (data_filter == 'days_15') {
       activedata.value='days_15'
      close()
      customers.value = data[0].days_15
     
      enddate.value = new Date().toLocaleDateString('en-GB').replace(/\//g, '-');
      startdate.value = new Date(new Date().setDate(new Date().getDate() - 14))
  .toLocaleDateString('en-GB')
  .replace(/\//g, '-');
  start.value= startdate.value
  end.value= enddate.value
    }
    else if (data_filter == 'month_1') {
       activedata.value='month_1'
      close()
      customers.value = data[0].month_1
      enddate.value = new Date().toLocaleDateString('en-GB').replace(/\//g, '-');

let prevMonthDate = new Date();
prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);

startdate.value = prevMonthDate.toLocaleDateString('en-GB').replace(/\//g, '-');

start.value= startdate.value
  end.value= enddate.value

    }
    else if (data_filter == 'months_3') {
       activedata.value='months_3'
    close()
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
  getdata('days_7', close);
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

const visibleRight = ref(false);
const stockname=ref('')
const dateval=ref('')
const quant=ref('')
const avg=ref('')
const ltp=ref('')
const invamt=ref('')
const mktval=ref('')
const overall=ref('')
const days=ref('')

const rightcanva =(dataval)=>{

visibleRight.value=true
stockname.value=dataval.stockname
dateval.value=dataval.date
quant.value=dataval.quantity
avg.value=dataval.avgprice
ltp.value=dataval.ltp
invamt.value=dataval.invamt
mktval.value=dataval.mktval
overall.value=dataval.overall
days.value=dataval.days
}

const proceedfun=async()=>{
const formdata=new FormData()
formdata.append('stockname', stockname.value)
formdata.append('date', dateval.value)
formdata.append('quantity', quant.value)
formdata.append('averageprice', avg.value)
formdata.append('ltp', ltp.value)
formdata.append('invamt', invamt.value)
formdata.append('mktval', mktval.value)
formdata.append('overall', overall.value)
formdata.append('days', days.value)
const api='https://fakestoreapi.com/products'
try {
const res = await fetch(api,{
method:'POST',
body:formdata
});
if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
const data = await res.json();
toast.add({ severity: 'success', summary: 'Success Message', detail: data.id, life: 3000 });
} catch (error) {
console.error("Error:", error.message);
}


}

const cancelfun=async()=>{

const formdata=new FormData()
formdata.append('stockname', stockname.value)
formdata.append('date', dateval.value)
formdata.append('quantity', quant.value)
formdata.append('averageprice', avg.value)
formdata.append('ltp', ltp.value)
formdata.append('invamt', invamt.value)
formdata.append('mktval', mktval.value)
formdata.append('overall', overall.value)
formdata.append('days', days.value)
const api='https://fakestoreapi.com/products'
try {
const res = await fetch(api,{
method:'POST',
body:formdata
});
if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
const data = await res.json();
toast.add({ severity: 'error', summary: 'Cancel Message', detail: data.id, life: 3000 });
} catch (error) {
console.error("Error:", error.message);
}
}

</script>

<style>
.left-1\/2 {
  left: 500% !important;
}
</style>