<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-800">Ajustes de Inventario</h1>
      <button @click="openModal()" class="btn-primary">
        + Nuevo Ajuste
      </button>
    </div>

    <!-- Resumen de Stock -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div class="card bg-blue-50 border border-blue-200">
        <div class="flex items-center space-x-4">
          <div class="bg-blue-500 text-white p-3 rounded-full">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
            </svg>
          </div>
          <div>
            <p class="text-sm text-blue-700 font-medium">Total Ajustes</p>
            <p class="text-2xl font-bold text-blue-900">{{ ajustes.length }}</p>
          </div>
        </div>
      </div>

      <div class="card bg-green-50 border border-green-200">
        <div class="flex items-center space-x-4">
          <div class="bg-green-500 text-white p-3 rounded-full">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <div>
            <p class="text-sm text-green-700 font-medium">Entradas</p>
            <p class="text-2xl font-bold text-green-900">{{ totalEntradas }}</p>
          </div>
        </div>
      </div>

      <div class="card bg-red-50 border border-red-200">
        <div class="flex items-center space-x-4">
          <div class="bg-red-500 text-white p-3 rounded-full">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <div>
            <p class="text-sm text-red-700 font-medium">Salidas</p>
            <p class="text-2xl font-bold text-red-900">{{ totalSalidas }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabla de Ajustes -->
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="table-header">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
              <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Cantidad</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Motivo</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Registrado Por</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="ajuste in ajustes" :key="ajuste.id" class="table-row">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{{ ajuste.id }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(ajuste.created_at) }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-900">
                {{ getProductoNombre(ajuste.producto_id) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center text-sm">
                <span :class="ajuste.cantidad > 0 ? 'text-green-600 font-bold' : 'text-red-600 font-bold'">
                  {{ ajuste.cantidad > 0 ? '+' : '' }}{{ ajuste.cantidad }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ ajuste.motivo }}</td>
              <td class="px-6 py-4 text-sm text-gray-500">
                {{ ajuste.registrado_por ? `Usuario #${ajuste.registrado_por}` : '-' }}
              </td>
            </tr>
            <tr v-if="ajustes.length === 0">
              <td colspan="6" class="px-6 py-4 text-center text-gray-500">No hay ajustes registrados</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 max-w-lg w-full mx-4">
        <h2 class="text-2xl font-bold mb-6 text-gray-800">Nuevo Ajuste de Inventario</h2>
        
        <form @submit.prevent="saveAjuste">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">Producto *</label>
            <select v-model="form.producto_id" required class="input-field">
              <option value="">Seleccione un producto...</option>
              <option v-for="producto in productos" :key="producto.id" :value="producto.id">
                {{ producto.nombre }} (Stock actual: {{ producto.stock_actual }})
              </option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">Cantidad *</label>
            <input 
              v-model.number="form.cantidad" 
              type="number" 
              required 
              class="input-field"
              placeholder="Positivo = Entrada / Negativo = Salida"
            >
            <p class="text-sm text-gray-500 mt-1">
              💡 Usa valores positivos para entradas y negativos para salidas
            </p>
          </div>

          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2">Motivo *</label>
            <select v-model="form.motivo" required class="input-field mb-2">
              <option value="">Seleccione un motivo...</option>
              <option value="Compra de mercadería">Compra de mercadería</option>
              <option value="Devolución de cliente">Devolución de cliente</option>
              <option value="Ajuste por inventario">Ajuste por inventario</option>
              <option value="Producto dañado">Producto dañado</option>
              <option value="Producto vencido">Producto vencido</option>
              <option value="Corrección de error">Corrección de error</option>
              <option value="Otro">Otro (especificar abajo)</option>
            </select>
            <input 
              v-if="form.motivo === 'Otro'" 
              v-model="form.motivoCustom" 
              type="text" 
              class="input-field" 
              placeholder="Especifique el motivo"
              required
            >
          </div>

          <!-- Vista Previa -->
          <div v-if="form.producto_id && form.cantidad" class="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p class="text-sm font-bold text-blue-900 mb-2">📊 Vista Previa del Ajuste:</p>
            <div class="text-sm text-blue-800">
              <p><strong>Producto:</strong> {{ getProductoNombre(form.producto_id) }}</p>
              <p><strong>Stock actual:</strong> {{ getStockActual(form.producto_id) }}</p>
              <p><strong>Cambio:</strong> 
                <span :class="form.cantidad > 0 ? 'text-green-600' : 'text-red-600'" class="font-bold">
                  {{ form.cantidad > 0 ? '+' : '' }}{{ form.cantidad }}
                </span>
              </p>
              <p><strong>Nuevo stock:</strong> 
                <span class="font-bold" :class="getStockActual(form.producto_id) + form.cantidad < 0 ? 'text-red-600' : 'text-green-600'">
                  {{ getStockActual(form.producto_id) + form.cantidad }}
                </span>
              </p>
            </div>
            <div v-if="getStockActual(form.producto_id) + form.cantidad < 0" class="mt-2 text-red-600 text-sm font-bold">
              ⚠️ ADVERTENCIA: El nuevo stock será negativo
            </div>
          </div>
          
          <div class="flex justify-end space-x-3">
            <button type="button" @click="closeModal()" class="btn-secondary">Cancelar</button>
            <button type="submit" class="btn-primary">Registrar Ajuste</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../services/api'

export default {
  name: 'Stock',
  data() {
    return {
      ajustes: [],
      productos: [],
      showModal: false,
      form: {
        producto_id: '',
        cantidad: 0,
        motivo: '',
        motivoCustom: ''
      }
    }
  },
  computed: {
    totalEntradas() {
      return this.ajustes.filter(a => a.cantidad > 0).length
    },
    totalSalidas() {
      return this.ajustes.filter(a => a.cantidad < 0).length
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    async loadData() {
      try {
        const [ajustesRes, productosRes] = await Promise.all([
          api.stock.getAll(),
          api.productos.getAll()
        ])
        this.ajustes = ajustesRes.data
        this.productos = productosRes.data
      } catch (error) {
        alert('Error al cargar datos')
      }
    },
    getProductoNombre(id) {
      const producto = this.productos.find(p => p.id === id)
      return producto ? producto.nombre : `Producto #${id}`
    },
    getStockActual(id) {
      const producto = this.productos.find(p => p.id === id)
      return producto ? producto.stock_actual : 0
    },
    openModal() {
      this.form = {
        producto_id: '',
        cantidad: 0,
        motivo: '',
        motivoCustom: ''
      }
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    },
    async saveAjuste() {
      try {
        const motivo = this.form.motivo === 'Otro' ? this.form.motivoCustom : this.form.motivo
        
        const data = {
          producto_id: this.form.producto_id,
          cantidad: this.form.cantidad,
          motivo: motivo
        }

        await api.stock.create(data)
        alert('✅ Ajuste registrado exitosamente')
        this.closeModal()
        this.loadData()
      } catch (error) {
        alert('Error: ' + (error.response?.data?.error || error.message))
      }
    },
    formatDate(date) {
      if (!date) return '-'
      return new Date(date).toLocaleDateString('es-PE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }
}
</script>