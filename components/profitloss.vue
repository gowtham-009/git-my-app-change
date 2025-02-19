<template>

    <Toast />
    <ConfirmPopup group="headless">
          <template #container="{    }">
           
              <div class="rounded p-4">
                <span class="text-lg"><i class="pi pi-clock"></i> Frequently used time period</span>
                <div class="w-full p-1 flex gap-2 pl-5">
                  <button type="button" :class="{ 'bg-blue-500 text-white': activeFilter === 'week' }" class="rounded-md  px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300" @click="filterLastWeek" >7 Days</button>
                  <button type="button" :class="{ 'bg-blue-500 text-white': activeFilter === '15days' }" class="rounded-md   px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300" @click="filterLast15Days">15 Days</button>
                  <button type="button" :class="{ 'bg-blue-500 text-white': activeFilter === 'month' }" class="rounded-md  px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300" @click="filterLastMonth">Month</button>
                  <button type="button" :class="{ 'bg-blue-500 text-white': activeFilter === '3months' }" class="rounded-md  px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300" @click="filterLast3Months">3 Months</button>
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
                <button @click="applyFilter" class="text-white bg-indigo-600 py-1 px-2 rounded-lg">Apply filter</button>
              </div>
              </div>
          </template>
      </ConfirmPopup>
      
    <div class="overflow-hidden rounded-lg bg-white ">
      <div class="px-1 py-2 flex ">
      <div class="p-2" style=" width: 20%;">
        <div>
        <div class="w-full text-slate-400" > Statement For</div>
        <div class="w-full text-black-500" style=" margin-top: -5px;"> {{ startdate }} To {{ enddate }}</div>
       </div>
      </div>
      <div class=" p-2 flex items-end" >
        <button type="button"   @click="requireConfirmation($event)" class="rounded-md  px-1 py-1 text-sm font-semibold text-slate-500   border-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clip-rule="evenodd" />
                </svg>
            </button>
           
      </div>
      
    </div>
    </div>
  

    <div  class="w-full" v-if="loading">
      <div class="p-1 space-y-4">
    
      <dl class="mx-auto grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-4">
    <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8 animate-pulse">
      <dt class="h-4 w-20 bg-gray-300 rounded"></dt>
      <dd class="h-3 w-10 bg-gray-300 rounded"></dd>
      <dd class="w-full h-8 bg-gray-300 rounded"></dd>
    </div>
    <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8 animate-pulse">
      <dt class="h-4 w-20 bg-gray-300 rounded"></dt>
      <dd class="h-3 w-10 bg-gray-300 rounded"></dd>
      <dd class="w-full h-8 bg-gray-300 rounded"></dd>
    </div>
    <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8 animate-pulse">
      <dt class="h-4 w-20 bg-gray-300 rounded"></dt>
      <dd class="h-3 w-10 bg-gray-300 rounded"></dd>
      <dd class="w-full h-8 bg-gray-300 rounded"></dd>
    </div>
    <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8 animate-pulse">
      <dt class="h-4 w-20 bg-gray-300 rounded"></dt>
      <dd class="h-3 w-10 bg-gray-300 rounded"></dd>
      <dd class="w-full h-8 bg-gray-300 rounded"></dd>
    </div>
  </dl>
  
   
    
      <!-- Table Skeleton -->
  
      <div class="border border-gray-200 rounded-lg ">
  
        <div class="h-20   bg-white animate-pulse rounded-lg flex gap-2 justify-end items-center py-5 p-3">
        <div class="h-12 w-96 bg-gray-200 animate-pulse rounded"></div>
        <div class="h-12 w-8 bg-gray-200 animate-pulse rounded"></div>
        <div class="h-12 w-8 bg-gray-200 animate-pulse rounded"></div>
      </div>
  
          <div class="grid grid-cols-5 bg-gray-100 p-3 font-semibold">
              <div class="h-8 w-20 bg-gray-200 animate-pulse rounded"></div>
              <div class="h-8 w-20 bg-gray-200 animate-pulse rounded"></div>
              <div class="h-8 w-20 bg-gray-200 animate-pulse rounded"></div>
              <div class="h-8 w-20 bg-gray-200 animate-pulse rounded"></div>
              <div class="h-8 w-20 bg-gray-200 animate-pulse rounded"></div>
             
          </div>
  
          <!-- Table Rows -->
          <div class="divide-y divide-gray-200">
              <div class="grid grid-cols-5 p-3 animate-pulse">
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                
              </div>
              <div class="grid grid-cols-5 p-3 animate-pulse">
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                 
              </div>
              <div class="grid grid-cols-5 p-3 animate-pulse">
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                 
              </div>
              <div class="grid grid-cols-5 p-3 animate-pulse">
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                 
              </div>
              <div class="grid grid-cols-5 p-3 animate-pulse">
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                 
              </div>
              <div class="grid grid-cols-5 p-3 animate-pulse">
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                
              </div>
              <div class="grid grid-cols-5 p-3 animate-pulse">
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                  
              </div>
              <div class="grid grid-cols-5 p-3 animate-pulse">
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                  
              </div>
              <div class="grid grid-cols-5 p-3 animate-pulse">
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                
              </div>
              <div class="grid grid-cols-5 p-3 animate-pulse">
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
                 
              </div>
              <div class="grid grid-cols-5 p-3 animate-pulse">
                  <div class="h-6 w-20 bg-gray-200 rounded"></div>
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
  
  
  <div class="w-full" v-if="content">
  <div class="overflow-hidden rounded-lg bg-white shadow  mt-1">
      <div class="px-2 py-2 ">
  
   <dl class="mx-auto grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-4">
    <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2  bg-white px-4 py-10 sm:px-6 xl:px-8">
      <dt class="text-sm/6 font-medium text-gray-500">Invested Amount</dt>
      <dd class="text-xs font-medium text-gray-700">+4.75%</dd>
      <dd class="w-full flex-none text-3xl/10 font-medium tracking-tight  text-gray-900">₹{{ investamount }}</dd>
    </div>
    <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
      <dt class="text-sm/6 font-medium text-gray-500">Current Value</dt>
      <dd class="text-xs font-medium text-rose-600">+54.02%</dd>
      <dd class="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900">₹{{ currentvalue }}</dd>
    </div>
    <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
      <dt class="text-sm/6 font-medium text-gray-500">Overall Gain</dt>
      <dd class="text-xs font-medium text-gray-700">-1.39%</dd>
      <dd class="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900">₹{{ overallgain }}</dd>
    </div>
    <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
      <dt class="text-sm/6 font-medium text-gray-500">Today's Gain</dt>
      <dd class="text-xs font-medium text-rose-600">+10.18%</dd>
      <dd class="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900">₹{{ todaygain }}</dd>
    </div>
  </dl>
  
  
  
     
      </div>
    </div>
  
    <div class="overflow-hidden rounded-lg bg-white  mt-2">
      <div class="p-1 py-2 ">
        <DataTable  ref="dt" v-model:filters="filters" paginator :rows="10" removableSort :loading="loading" filterDisplay="menu" :globalFilterFields="['month', 'date', 'no_of_trades', 'realizedpl', 'charges', 'net_realizedpl']" stripedRows :value="filteredCustomers"  >
  
  
  
  <template #header>
        <div class="flex justify-end items-center">
            <IconField >
                <InputIcon>
                    <i class="pi pi-search mb-2" />
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
  
  <Column  class="cursor-pointer"  v-if="visibleColumns.includes('month')" sortable field="month" header="Month">
    <template #body="{ data }">
           <span @click="rightcanva(data)"> {{ data.month }}</span>
        </template>
        <template #filter="{ filterModel }">
            <InputText v-model="filterModel.value" type="text" placeholder="Search by name" />
        </template>
  </Column>
  
 

  <Column  class="cursor-pointer" v-if="visibleColumns.includes('no_of_trades')" field="no_of_trades" sortable header="No_of_trades" :showFilterOperator="false" :showFilterMatchModes="false">
    <template #body="{ data }">
          <span @click="rightcanva(data)">{{ data.no_of_trades }}</span>
      </template>
<template #filter="{ filterModel }">
  <Slider v-model="filterModel.value" range class="m-4" :min="1" :max="1000"></Slider>
  <div class="flex items-center justify-between px-2">
      <span>{{ filterModel.value ? filterModel.value[0] : 0 }}</span>
      <span>{{ filterModel.value ? filterModel.value[1] : 100 }}</span>
  </div>
</template>
  </Column>
  <Column  class="cursor-pointer" v-if="visibleColumns.includes('realizedpl')" field="realizedpl" sortable header="Realizedpl" :showFilterOperator="false" :showFilterMatchModes="false">
    <template #body="{ data }">
          <span @click="rightcanva(data)">{{ data.realizedpl }}</span>
      </template>
<template #filter="{ filterModel }">
  <Slider v-model="filterModel.value" range class="m-4" :min="1" :max="100000"></Slider>
  <div class="flex items-center justify-between px-2">
      <span>{{ filterModel.value ? filterModel.value[0] : 0 }}</span>
      <span>{{ filterModel.value ? filterModel.value[1] : 100 }}</span>
  </div>
</template>

  </Column>
  
  
  <Column  class="cursor-pointer" v-if="visibleColumns.includes('charges')" sortable field="charges" header="Charges"  :showFilterOperator="false" :showFilterMatchModes="false">
    <template #body="{ data }">
          <span @click="rightcanva(data)">{{ data.charges }}</span>
      </template>
<template #filter="{ filterModel }">
  <Slider v-model="filterModel.value" range class="m-4" :min="1" :max="1000"></Slider>
  <div class="flex items-center justify-between px-2">
      <span>{{ filterModel.value ? filterModel.value[0] : 0 }}</span>
      <span>{{ filterModel.value ? filterModel.value[1] : 100 }}</span>
  </div>
</template>
  </Column>
  <Column  class="cursor-pointer" v-if="visibleColumns.includes('net_realizedpl')" sortable field="net_realizedpl" header="Net_realizedpl "  :showFilterOperator="false" :showFilterMatchModes="false">
    <template #body="{ data }">
          <span @click="rightcanva(data)">{{ data.net_realizedpl }}</span>
      </template>
<template #filter="{ filterModel }">
  <Slider v-model="filterModel.value" range class="m-4" :min="1" :max="100000"></Slider>
  <div class="flex items-center justify-between px-2">
      <span>{{ filterModel.value ? filterModel.value[0] : 0 }}</span>
      <span>{{ filterModel.value ? filterModel.value[1] : 100 }}</span>
  </div>
</template>
  </Column>
 
  <Column  class="cursor-pointer" v-if="visibleColumns.includes('date')" field="date" dataType="date" sortable header="Date" :showFilterOperator="false" :showFilterMatchModes="false">
    <template #body="{ data }">
  <span @click="rightcanva(data)">{{ formatDatee(data.date) }}</span>
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
        <h1>{{ month }}</h1>
      </div>
      <hr>
      <div class="w-full mt-2">
        
      <Accordion value="0">
  <AccordionPanel value="0">
      <AccordionHeader>Details</AccordionHeader>
      <AccordionContent>
  
        <div class="w-full  flex">
          <div class="w-full " ><span>Month</span></div>
          <div class="w-full " ><span>{{month}}</span></div>
        </div>
     
        <div class="w-full  flex">
          <div class="w-full " ><span>Date</span></div>
          <div class="w-full " ><span>{{date}}</span></div>
        </div>
        <div class="w-full  flex">
          <div class="w-full " ><span>No of Trades</span></div>
          <div class="w-full " ><span>{{nooftrades}}</span></div>
        </div>
        <div class="w-full  flex">
          <div class="w-full " ><span>Realized </span></div>
          <div class="w-full " ><span>{{realizedpl}}</span></div>
        </div>
        
        <div class="w-full  flex">
          <div class="w-full " ><span>Net Realized</span></div>
          <div class="w-full " ><span>{{netrealised}}</span></div>
        </div>
        <div class="w-full  flex">
          <div class="w-full " ><span>Charges</span></div>
          <div class="w-full " ><span>{{charges}}</span></div>
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
  import { ref, onMounted } from 'vue';
  import DatePicker from 'primevue/datepicker';
  import { FilterMatchMode, FilterOperator } from '@primevue/core/api';
  import { useToast } from "primevue/usetoast";
  import 'primeicons/primeicons.css'
  
  
  import { useConfirm } from "primevue/useconfirm";
  
  
  const confirm = useConfirm();

  const formatDatee = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year.slice(-4)}`; // Convert yy-mm-dd to dd-mm-yy
  };
  
  const loading=ref(true)
  const content=ref(false)
  
  const toast = useToast();
  
  const investamount=ref('')
  const currentvalue=ref('')
  const overallgain=ref('')
  const todaygain=ref('')
  
  
  
  
  const filters = ref();
  
  const customers = ref([]);
  const start = ref(null);
  const end = ref(null);
  const filteredCustomers = ref([]);
  const activeFilter = ref('week'); // Track active filter
  
  
  const startdate=ref('')
  const enddate=ref('')
  
  const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        month: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        no_of_trades: { value: [0, 1000], matchMode: FilterMatchMode.BETWEEN },
        realizedpl: { value: [0, 100000], matchMode: FilterMatchMode.BETWEEN },
        charges: { value: [0, 1000], matchMode: FilterMatchMode.BETWEEN },
        net_realizedpl: { value: [0, 100000], matchMode: FilterMatchMode.BETWEEN },
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
  const getdata = async () => {
    try {
      const res = await fetch('/profitloss.json');
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      customers.value = await res.json();
      filterLastWeek(); // Apply 7-day filter on page load
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  
  // Function to filter last 7 days
  const filterLastWeek = async () => {
   
    setInterval(() => {
      loading.value=false
      content.value=true
    }, 1000);
    const today = new Date();
    try {
  
  const res = await fetch('/amounttable.json');
  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  const data = await res.json();
  investamount.value=data[0].week.investamount
  currentvalue.value=data[0].week.currentvalue
  overallgain.value=data[0].week.overallgain
  todaygain.value=data[0].week.todaygain
  
  } catch (error) {
  console.error("Error:", error.message);
  }
    today.setHours(23, 59, 59, 999); 
  
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0); 
  
    // Filter customers within the last week
    filteredCustomers.value = customers.value.filter(customer => {
        const customerDate = new Date(customer.date);
        return customerDate >= sevenDaysAgo && customerDate <= today;
    });
  
    activeFilter.value = 'week'; // Update active filter
    confirm.close();
  
    // Log first and last date if data exists
    if (filteredCustomers.value.length > 0) {
      const formatDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
      };
  
     const stdate= filteredCustomers.value[0].date;
     const endate = filteredCustomers.value[filteredCustomers.value.length - 1].date;
  
      startdate.value = formatDate(stdate);
      enddate.value = formatDate(endate);
  
      start.value=startdate.value
      end.value=enddate.value
  
      console.log(start.value);
    } else {
      console.log("No customers found in the last week.");
    }
  };
  
  // Function to filter last 15 days
  const filterLast15Days = async() => {
  
    try {
  
  const res = await fetch('/amounttable.json');
  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  const data = await res.json();
  investamount.value=data[1].day_15.investamount
  currentvalue.value=data[1].day_15.currentvalue
  overallgain.value=data[1].day_15.overallgain
  todaygain.value=data[1].day_15.todaygain
  
  } catch (error) {
  console.error("Error:", error.message);
  }
  
  
  
  
  
    const today = new Date();
    const fifteenDaysAgo = new Date();
    fifteenDaysAgo.setDate(today.getDate() - 15);
  
    filteredCustomers.value = customers.value.filter(customer => {
      const customerDate = new Date(customer.date);
      return customerDate >= fifteenDaysAgo && customerDate <= today.setHours(23, 59, 59, 999);
    });
  
    if (filteredCustomers.value.length > 0) {
      const formatDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
      };
  
      const stdate= filteredCustomers.value[0].date;
     const endate = filteredCustomers.value[filteredCustomers.value.length - 1].date;
  
      startdate.value = formatDate(stdate);
      enddate.value = formatDate(endate);
  
      start.value=startdate.value
      end.value=enddate.value
  
     
    } else {
      console.log("No customers found in the last week.");
    }
  
    activeFilter.value = '15days'; // Update active filter state
    
    confirm.close();
  };
  
  // Function to filter last month
  const filterLastMonth = async() => {
  
    try {
  
  const res = await fetch('/amounttable.json');
  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  const data = await res.json();
  investamount.value=data[2].month.investamount
  currentvalue.value=data[2].month.currentvalue
  overallgain.value=data[2].month.overallgain
  todaygain.value=data[2].month.todaygain
  
  } catch (error) {
  console.error("Error:", error.message);
  }
  
    const today = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(today.getMonth() - 1);
  
    filteredCustomers.value = customers.value.filter(customer => {
      const customerDate = new Date(customer.date);
      return customerDate >= lastMonth && customerDate <= today.setHours(23, 59, 59, 999);
    });
  
    if (filteredCustomers.value.length > 0) {
      const formatDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
      };
  
      const stdate= filteredCustomers.value[0].date;
     const endate = filteredCustomers.value[filteredCustomers.value.length - 1].date;
  
      startdate.value = formatDate(stdate);
      enddate.value = formatDate(endate);
  
      start.value=startdate.value
      end.value=enddate.value
  
     
    } else {
      console.log("No customers found in the last week.");
    }
  
    activeFilter.value = 'month'; // Update active filter state
    confirm.close();
  };
  
  // Function to filter last 3 months
  const filterLast3Months = async() => {
  
    try {
  
  const res = await fetch('/amounttable.json');
  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  const data = await res.json();
  investamount.value=data[3].month_3.investamount
  currentvalue.value=data[3].month_3.currentvalue
  overallgain.value=data[3].month_3.overallgain
  todaygain.value=data[3].month_3.todaygain
  
  } catch (error) {
  console.error("Error:", error.message);
  }
  
    const today = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(today.getMonth() - 3);
  
    filteredCustomers.value = customers.value.filter(customer => {
      const customerDate = new Date(customer.date);
      return customerDate >= threeMonthsAgo && customerDate <= today.setHours(23, 59, 59, 999);
    });
  
    if (filteredCustomers.value.length > 0) {
      const formatDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
      };
  
      const stdate= filteredCustomers.value[0].date;
     const endate = filteredCustomers.value[filteredCustomers.value.length - 1].date;
  
      startdate.value = formatDate(stdate);
      enddate.value = formatDate(endate);
  
      start.value=startdate.value
      end.value=enddate.value
  
      console.log(start.value);
    } else {
      console.log("No customers found in the last week.");
    }
  
    activeFilter.value = '3months'; 
    confirm.close();
  };
  
  const applyFilter = () => {
    if (!start.value || !end.value) {
      filteredCustomers.value = customers.value;
      return;
    }
  
    // Convert date values to dd-mm-yyyy format
    const startDate = new Date(start.value);
    const endDate = new Date(end.value);
    
    const formatDate = (date) => {
      return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
    };
  
    startdate.value=formatDate(startDate)
    enddate.value=formatDate(endDate)
  
  
    filteredCustomers.value = customers.value.filter(customer => {
      const customerDate = new Date(customer.date);
      return customerDate >= startDate && customerDate <= endDate.setHours(23, 59, 59, 999);
    });
  
    activeFilter.value = ''; // Reset filter state when custom date is selected
    confirm.close();
  };
  
  onMounted(() => {
    getdata();
  });
  
  
  
  const columns = ref([
  { field: 'month', header: 'Month' },
  { field: 'date', header: 'Date' },
  { field: 'no_of_trades', header: 'No of Trades' },
  { field: 'realizedpl', header: 'Realized Pl' },
  { field: 'charges', header: 'Charges' },
  { field: 'net_realizedpl', header: 'Net Realized' },
 
 
  
  ]);
  //Initially select all columns except 'ltp', 'mktval', and 'date'
  const selectedColumns = ref(columns.value.filter(col => !['date'].includes(col.field)));
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
  const month=ref('')
  const date=ref('')
  const nooftrades=ref('')
  const realizedpl=ref('')
  const charges=ref('')
  const netrealised=ref('')
 
  
  
  const rightcanva =(dataval)=>{
  
  visibleRight.value=true
  month.value=dataval.month
 
  date.value=dataval.date
  nooftrades.value=dataval.no_of_trades
  realizedpl.value=dataval.realizedpl
  netrealised.value=dataval.net_realizedpl
  charges.value=dataval.charges
  
  }
  
  const proceedfun=async()=>{
  const formdata=new FormData()
  formdata.append('scriptname',  scriptname.value)
  formdata.append('orderid',  orderid.value)
  formdata.append('date', date.value)
  formdata.append('action', action.value)
  formdata.append('quant', quantity.value)
  formdata.append('buysell', buysell.value)
  formdata.append('brockage', brockage.value)
  formdata.append('charges',charges.value)
  
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
  formdata.append('scriptname',  scriptname.value)
  formdata.append('orderid',  orderid.value)
  formdata.append('date', date.value)
  formdata.append('action', action.value)
  formdata.append('quant', quantity.value)
  formdata.append('buysell', buysell.value)
  formdata.append('brockage', brockage.value)
  formdata.append('charges',charges.value)
  
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
  
  
  const requireConfirmation = (event) => {
      confirm.require({
          target: event.currentTarget,
          group: 'headless',
          message: 'Save your current process?',
         
      });
  }
  
  </script>
  <style>
  
  .p-checkbox-checked.p-variant-filled .p-checkbox-box{
    background-color: blue !important;
    border: blue !important;
  }
 
  .p-multiselect.p-variant-filled{
    background: none !important;
  }
  .p-multiselect{
    border: none !important;
    box-shadow: none !important;
  }
  .p-multiselect-dropdown{
    border: 2px solid rgb(227, 227, 227);
    border-radius: 5px;
  }
  </style>