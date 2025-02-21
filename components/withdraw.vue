<template>
    <div>
      <div  class="w-full" v-if="loading">
    <div class="p-1 space-y-4">
    <!-- Table Skeleton -->

    <div class="border border-gray-200 rounded-lg ">

      <div class="h-20   bg-white animate-pulse rounded-lg flex gap-2 justify-end items-center py-5 p-3">
      <div class="h-12 w-96 bg-gray-200 animate-pulse rounded"></div>
      <div class="h-12 w-8 bg-gray-200 animate-pulse rounded"></div>
      <div class="h-12 w-8 bg-gray-200 animate-pulse rounded"></div>
    </div>
    <div class="grid grid-cols-4 bg-gray-100 p-3 font-semibold">
            <div class="h-8 w-20 bg-gray-200 animate-pulse rounded"></div>
            <div class="h-8 w-20 bg-gray-200 animate-pulse rounded"></div>
            <div class="h-8 w-20 bg-gray-200 animate-pulse rounded"></div>
            <div class="h-8 w-20 bg-gray-200 animate-pulse rounded"></div>
            
        </div>

        <!-- Table Rows -->
        <div class="divide-y divide-gray-200">
            <div class="grid grid-cols-4 p-3 animate-pulse">
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
              
            </div>
            <div class="grid grid-cols-4 p-3 animate-pulse">
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
        
            </div>
            <div class="grid grid-cols-4 p-3 animate-pulse">
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
              
            </div>
            <div class="grid grid-cols-4 p-3 animate-pulse">
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
              
            </div>
            <div class="grid grid-cols-4 p-3 animate-pulse">
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
             
            </div>
            <div class="grid grid-cols-4 p-3 animate-pulse">
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
              
            </div>
            <div class="grid grid-cols-4 p-3 animate-pulse">
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
             
            </div>
            <div class="grid grid-cols-4 p-3 animate-pulse">
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
            
            </div>
            <div class="grid grid-cols-4 p-3 animate-pulse">
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
          
            </div>
            <div class="grid grid-cols-4 p-3 animate-pulse">
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
               
            </div>
            <div class="grid grid-cols-4 p-3 animate-pulse">
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
                <div class="h-6 w-20 bg-gray-200 rounded"></div>
             
            </div>
            
        </div>
    </div>

    <!-- Pagination Skeleton -->
    <div class="flex justify-center space-x-2">
        <div class="h-8 w-8 bg-gray-200 animate-pulse rounded-full"></div>
        <div class="h-8 w-8 bg-gray-200 animate-pulse rounded-full"></div>
        <div class="h-8 w-8 bg-gray-200 animate-pulse rounded-full"></div>
    </div>
</div>
</div>
      <div class="p-1 w-full" v-if="content">
        
      
       
  
        <div class="w-full p-2  mt-2" >
            <DataTable ref="dt" v-model:filters="filters" :value="customers" paginator showGridlines :rows="10" dataKey="id"
            filterDisplay="menu" :loading="loading" :globalFilterFields="['account', 'bank', 'date', 'amount', 'status']" stripedRows   >
              <template #header>
                <div class="w-full flex justify-end items-center">
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-search " />
                        </InputIcon>
                        <InputText v-model="filters['global'].value" placeholder="Search stock and company" class="w-96" />
                    </IconField>
                    <MultiSelect
                v-model="selectedColumns"
                :options="columns"
                optionLabel="header"
                @change="updateVisibleColumns"
                display="template"
  
                :showToggleAll="false"
                :dropdownIcon="null" 
               class="p-0 text-white ml-2"
                style="width: 40px; height: 34px; "
                >
  
                <template #dropdownicon>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-slate-500">
                    <path fill-rule="evenodd" d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 18.375V5.625ZM21 9.375A.375.375 0 0 0 20.625 9h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5ZM10.875 18.75a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5ZM3.375 15h7.5a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375Zm0-3.75h7.5a.375.375 0 0 0 .375-.375v-1.5A.375.375 0 0 0 10.875 9h-7.5A.375.375 0 0 0 3 9.375v1.5c0 .207.168.375.375.375Z" clip-rule="evenodd" />
                    </svg>

              </template>
                
                <template #footer v-if="showReset">
                  <button type="button"  @click="resetColumns" class="rounded-md w-full bg-indigo-600 px-2 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Reset</button>
  
                </template>
                </MultiSelect>
                <button type="button"  @click="exportCSV($event)" class="rounded-md ml-2  px-1 py-1 text-sm font-semibold text-slate-500  border-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z" clip-rule="evenodd" />
                </svg>
                </button>
                </div>
              </template>
            <template #empty> No customers found. </template>
            <template #loading> Loading customers data. Please wait. </template>
  
            <Column v-if="visibleColumns.includes('account')" field="account" sortable header="Account">
                <template #body="{ data }">
                   <span  @click="rightcanva(data)"> {{ data.account }}</span>
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" placeholder="Search by name" />
                </template>
            </Column>
            <Column v-if="visibleColumns.includes('bank')" field="bank" sortable header="Bank">
                <template #body="{ data }">
                  <span  @click="rightcanva(data)">  {{ data.bank }}</span>
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" placeholder="Search by name" />
                </template>
            </Column>
            <Column v-if="visibleColumns.includes('date')" header="Date" filterField="date" dataType="date">
                <template #body="{ data }">
                <span  @click="rightcanva(data)">{{ formatDatee(data.date) }}</span>
                    </template>
                    <template  #filter="{ filterModel }">
                        <DatePicker 
                        v-model="filters.date.constraints[0].value" 
                        dateFormat="dd-mm-yy" 
                        showIcon
                        @update:modelValue="applyDateFilter"
                />
                </template>
            </Column>
            <Column v-if="visibleColumns.includes('amount')" field="amount" sortable header="Amount" :showFilterOperator="false" :showFilterMatchModes="false">
                <template #body="{ data }">
                    <span  @click="rightcanva(data)"> {{ data.amount }}</span>
                </template>
            <template #filter="{ filterModel }">
            <Slider v-model="filterModel.value" range class="m-4" :min="1" :max="100000"></Slider>
            <div class="flex items-center justify-between px-2">
                <span>{{ filterModel.value ? filterModel.value[0] : 0 }}</span>
                <span>{{ filterModel.value ? filterModel.value[1] : 100 }}</span>
            </div>
            </template>
            </Column>
            <Column v-if="visibleColumns.includes('status')" field="status" sortable header="Status">
                <template #body="{ data }">
                   <span  @click="rightcanva(data)"> <Tag :value="data.status"  /></span>
                </template>
                <template #filter="{ filterModel }">
                    <Select v-model="filterModel.value" :options="statuses" placeholder="Select One" showClear>
                        <template #option="slotProps">
                            <Tag :value="slotProps.option"  />
                        </template>
                    </Select>
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
        <div class="w-full " ><span>Account</span></div>
        <div class="w-full " ><span>{{account}}</span></div>
      </div>
      <div class="w-full  flex">
        <div class="w-full " ><span>Bank</span></div>
        <div class="w-full " ><span>{{bank}}</span></div>
      </div>
      <div class="w-full  flex">
        <div class="w-full " ><span>Date</span></div>
        <div class="w-full " ><span>{{date}}{{ time }}</span></div>
      </div>
      <div class="w-full  flex">
        <div class="w-full " ><span>Amount</span></div>
        <div class="w-full " ><span>{{amount}}</span></div>
      </div>
      <div class="w-full  flex">
        <div class="w-full " ><span>Status</span></div>
        <div class="w-full " ><span>{{status}}</span></div>
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
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { onMounted } from 'vue';
  import DatePicker from 'primevue/datepicker';
  import { FilterMatchMode, FilterOperator } from '@primevue/core/api';
  import { useToast } from "primevue/usetoast";
  import 'primeicons/primeicons.css'
  import { useConfirm } from "primevue/useconfirm";

  const loading=ref(true)
  const content=ref(false)








  const filters = ref();
const customers=ref([])
const getdata = async () => {
    try {
      const res = await fetch('/fadded.json');
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      customers.value = await res.json();
      
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
onMounted(() => {
    getdata()
    setInterval(() => {
      loading.value=false
      content.value=true
    }, 2000);
});


const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        account: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        bank: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        amount: { value: [0, 100000], matchMode: FilterMatchMode.BETWEEN },
        status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    };
};

const statuses = ref(['Failed', 'Success', 'Pending']);
initFilters();

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

const formatDatee = (dateString) => {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year.slice(-4)}`; // Convert yy-mm-dd to dd-mm-yy
};



const columns = ref([
{ field: 'account', header: 'Account' },
{ field: 'bank', header: 'Bank' },
{ field: 'date', header: 'Date' },
{ field: 'amount', header: 'Amount' },
{ field: 'status', header: 'Status' },

]);

const selectedColumns = ref(columns.value.filter(col => ![ 'date'].includes(col.field)));
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

const dt = ref();

const exportCSV = () => {
dt.value.exportCSV();
};



const visibleRight = ref(false);
const account=ref('')
const bank=ref('')
const date=ref('')
const time=ref('')
const amount=ref('')
const status=ref('')

const rightcanva =(dataval)=>{

visibleRight.value=true
account.value=dataval.account
bank.value=dataval.bank
date.value=dataval.date
time.value=dataval.time
amount.value=dataval.amount
status.value=dataval.status

}



const proceedfun=async()=>{
const formdata=new FormData()
formdata.append('account', account.value)
formdata.append('bank', bank.value)
formdata.append('date', date.value)
formdata.append('time', time.value)
formdata.append('amount', amount.value)
formdata.append('status', status.value)

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
formdata.append('account', account.value)
formdata.append('bank', bank.value)
formdata.append('date', date.value)
formdata.append('time', time.value)
formdata.append('amount', amount.value)
formdata.append('status', status.value)
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
  
  <style >
  .p-checkbox-checked.p-variant-filled .p-checkbox-box{
    background-color: #4F46E5 !important;
    border: #4F46E5 !important;
  }
 
  .p-multiselect.p-variant-filled{
    background: none !important;
   
  }
  .p-multiselect-dropdown{
    border: 2px solid rgb(227, 227, 227);
    border-radius: 5px;
  }
  .p-multiselect{
  
    box-shadow: none !important;
  }
  </style>
  