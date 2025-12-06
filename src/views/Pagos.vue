<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-800">Gestión de Pagos</h1>
      <button @click="openModal()" class="btn-primary">
        + Registrar Pago
      </button>
    </div>

    <!-- Tabla de Pagos -->
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="table-header">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Venta ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Monto</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Método</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Referencia</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="pago in pagos" :key="pago.id" class="table-row">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{{ pago.id }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(pago.fecha) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Venta #{{ pago.venta_id }}</td>
              <td class="px-6 py-4 text-sm text-gray-900">{{ pago.cliente || '-' }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-green-600">
                S/ {{ Number(pago.monto).toFixed(2) }}
              </td>
              <td class="px-6 py-4 text-sm">
                <span :class="getMetodoClass(pago.metodo)" class="px-2 py-1 rounded-full text-xs font-semibold">
                  {{ pago.metodo || 'No especificado' }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ pago.referencia || '-' }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <button @click="openModal(pago)" class="text-blue-600 hover:text-blue-900">Editar</button>
                <button @click="deletePago(pago.id)" class="text-red-600 hover:text-red-900">Eliminar</button>
              </td>
            </tr>
            <tr v-if="pagos.length === 0">
              <td colspan="8" class="px-6 py-4 text-center text-gray-500">No hay pagos registrados</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
        <h2 class="text-2xl font-bold mb-6 text-gray-800">
          {{ editMode ? 'Editar Pago' : 'Registrar Pago' }}
        </h2>
        
        <form @submit.prevent="savePago" class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">Venta ID *</label>
            <input v-model.number="form.venta_id" type="number" required class="input-field" :disabled="editMode">
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">Monto *</label>
            <input v-model.number="form.monto" type="number" step="0.01" required class="input-field">
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">Método de Pago</label>
            <select v-model="form.metodo" class="input-field">
              <option value="">Seleccione...</option>
              <option value="EFECTIVO">Efectivo</option>
              <option value="TARJETA">Tarjeta</option>
              <option value="TRANSFERENCIA">Transferencia</option>
              <option value="YAPE">Yape</option>
              <option value="PLIN">Plin</option>
            </select>
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">Referencia</label>
            <input v-model="form.referencia" type="text" class="input-field" placeholder="Ej: Operación #123">
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">Cliente</label>
            <input v-model="form.cliente" type="text" class="input-field">
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">Teléfono</label>
            <input v-model="form.telefono" type="text" class="input-field">
          </div>
          
          <div class="col-span-2 flex justify-end space-x-3 mt-4">
            <button type="button" @click="closeModal()" class="btn-secondary">Cancelar</button>
            <button type="submit" class="btn-primary">{{ editMode ? 'Actualizar' : 'Registrar' }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../services/api'

export default {
  name: 'Pagos',
  data() {
    return {
      pagos: [],
      showModal: false,
      editMode: false,
      form: {
        id: null,
        venta_id: '',
        monto: 0,
        metodo: '',
        referencia: '',
        cliente: '',
        telefono: ''
      }
    }
  },
  mounted() {
    this.loadPagos()
  },
  methods: {
    async loadPagos() {
      try {
        const response = await api.pagos.getAll()
        this.pagos = response.data
      } catch (error) {
        alert('Error al cargar pagos')
      }
    },
    getMetodoClass(metodo) {
      const classes = {
        'EFECTIVO': 'bg-green-100 text-green-800',
        'TARJETA': 'bg-blue-100 text-blue-800',
        'TRANSFERENCIA': 'bg-purple-100 text-purple-800',
        'YAPE': 'bg-pink-100 text-pink-800',
        'PLIN': 'bg-yellow-100 text-yellow-800'
      }
      return classes[metodo] || 'bg-gray-100 text-gray-800'
    },
    openModal(pago = null) {
      if (pago) {
        this.editMode = true
        this.form = { ...pago }
      } else {
        this.editMode = false
        this.form = {
          id: null,
          venta_id: '',
          monto: 0,
          metodo: '',
          referencia: '',
          cliente: '',
          telefono: ''
        }
      }
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    },
    async savePago() {
      try {
        if (this.editMode) {
          await api.pagos.update(this.form.id, this.form)
          alert('Pago actualizado exitosamente')
        } else {
          await api.pagos.create(this.form)
          alert('Pago registrado exitosamente')
        }
        this.closeModal()
        this.loadPagos()
      } catch (error) {
        alert('Error: ' + (error.response?.data?.error || error.message))
      }
    },
    async deletePago(id) {
      if (!confirm('¿Eliminar este pago?')) return
      try {
        await api.pagos.delete(id)
        alert('Pago eliminado')
        this.loadPagos()
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