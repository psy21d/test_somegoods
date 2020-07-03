<template>
  <div class="container">
    <!-- v-app important -->
    <v-app id ="table-app">
      <v-data-table
        :headers="tableheaders"
        :items="tablegoods"
        :items-per-page="10"
        :sort-desc="[false, true]"
        multi-sort
        class="datatable"
      >
      <template
        v-slot:top
        class="table__top"
      >
        <v-btn
          color="#00cc00"
          class="mb-2"
          dark
          @click="createItem"
        >
        + Создать новый товар
        </v-btn> 
      </template>
      <template v-slot:item.edit_fields="{ item }">
        <td class="nowrap">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            {{ icons.mdiPencil }}
          </v-icon>
          <v-icon
            small
            @click="deleteItem(item)"
          >
            {{ icons.mdiDelete }}
          </v-icon>
        </td>
      </template>
      </v-data-table>

      <v-dialog
        v-model="dialogShow"
        max-width="500px"
      >
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text class="dialog__cards">
            <v-text-field 
              v-for="(field, n) in headers"
              :key="n"
              v-model="editedItem[field]"
              :label="field"
            >
            </v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogClose">Закрыть</v-btn>
            <v-btn color="blue darken-1" text @click="confirmEditItem">Сохранить</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'
import Component from 'vue-class-component'
import { goods, headers } from '@/mock/goods'
import { v4 as uuidv4 } from 'uuid';
import {
  mdiPencil,
  mdiDelete,
} from '@mdi/js'

@Component({
  data: () => ({
    icons: {
      mdiPencil,
      mdiDelete,
    },
  }),
})
export default class Table extends Vue {

  formTitle=""
  dialogShow=false

  isNewItem=true

  //activate this.headers access
  headers = headers

  tablegoods = goods
  
  // TODO сделать запрос полей с сервера или на основе возвращаемых данных
  tableheaders: Array<any> = []

  editedItem: any = {}
  // TODO сделать верную типизацию на основе возвращаемых полей данных
  
  //TODO временное решение для mock
  //Создать id товара для редактирования
  goods = goods.map(item => {
    return {
      id: uuidv4(),
      ...item
    }
  })

  mounted() {
    this.tableheaders = this.headers.map(item => {
      return {
        text: item,
        align: 'start',
        sortable: true,
        value: item,
      }
    })

    this.tableheaders.push({
      text: "",
      align: 'start',
      sortable: false,
      value: "edit_fields",
    })
    this.fillNewItem()
  }

  fillNewItem() {
    this.editedItem = {...this.editedItem}
    this.headers.forEach(header => {
      this.editedItem[header] = ""
    })
    this.editedItem.id = uuidv4()
  }

  fillEditedItem(item: any) {
    this.editedItem = item
    //Object.keys(item).forEach(key => {
    //  this.editedItem[key] = item[key]
    //})
  }

  createItem() {
    this.formTitle="Новый товар"
    this.isNewItem=true
    this.dialogShow=true
    this.fillNewItem()    
  }

  editItem(item: any) {
    this.formTitle="Редактировать товар"
    this.isNewItem=false
    this.dialogShow=true
    this.fillEditedItem(item)
  }

  deleteItem(item: any) {
    /* empty */
  }

  confirmEditItem() {
    this.dialogShow=false
    if (this.isNewItem) {
      this.tablegoods.push({...this.editedItem})
    }
    // TODO upload to server (call update request)
  }

  dialogClose() {
    this.dialogShow=false
  }
}

</script>

<style scoped lang="scss">
.table__top {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
}
#table-app {
  margin-top: 40px;
}
/*deep*/.v-data-table-header > tr > th {
  white-space: nowrap;
}

.nowrap {
  white-space: nowrap;
}
</style>
