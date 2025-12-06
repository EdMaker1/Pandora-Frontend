<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-800">Gestión de Empleados</h1>
      <button @click="openModal()" class="btn-primary">
        + Nuevo Empleado
      </button>
    </div>

    <!-- Tabla -->
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="table-header">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rol</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="empleado in empleados" :key="empleado.id" class="table-row">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ empleado.id }}</td>
              <td class="px-6 py-4 text-sm font-medium text-gray-900">
                {{ empleado.primer_nombre }} {{ empleado.apellido_paterno }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-900">{{ empleado.username }}</td>
              <td class="px-6 py-4 text-sm">
                <span :class="getRolClass(empleado.rol)" class="px-2 py-1 rounded-full text-xs font-semibold">
                  {{ getRolDisplayName(empleado.rol) }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ empleado.email || '-' }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span :class="empleado.activo ? 'text-green-600' : 'text-red-600'" class="font-semibold">
                  {{ empleado.activo ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <button @click="openModal(empleado)" class="text-blue-600 hover:text-blue-900">Editar</button>
                <button @click="deleteEmpleado(empleado.id)" class="text-red-600 hover:text-red-900" v-if="empleado.username !== 'sa'">Eliminar</button>
              </td>
            </tr>
            <tr v-if="empleados.length === 0">
              <td colspan="7" class="px-6 py-4 text-center text-gray-500">No hay empleados registrados</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div class="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 my-8">
        <h2 class="text-2xl font-bold mb-6 text-gray-800">
          {{ editMode ? 'Editar Empleado' : 'Nuevo Empleado' }}
        </h2>
        
        <form @submit.prevent="saveEmpleado" class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">Primer Nombre *</label>
            <input v-model="form.primer_nombre" type="text" required class="input-field">
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">Segundo Nombre</label>
            <input v-model="form.segundo_nombre" type="text" class="input-field">
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">Apellido Paterno *</label>
            <input v-model="form.apellido_paterno" type="text" required class="input-field">
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">Apellido Materno</label>
            <input v-model="form.apellido_materno" type="text" class="input-field">
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">Username *</label>
            <input v-model="form.username" type="text" required class="input-field">
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input v-model="form.email" type="email" class="input-field">
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">Rol *</label>
            <select v-model="form.rol" required class="input-field">
              <option value="">Seleccione...</option>
              <option value="ADMINISTRADOR">Administrador</option>
              <option value="SOPORTE">Soporte</option>
              <option value="VENDEDOR">Vendedor</option>
              <option value="CAJERO">Cajero</option>
              <option value="ALMACEN">Almacén</option>
            </select>
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">Estado</label>
            <select v-model="form.activo" class="input-field">
              <option :value="true">Activo</option>
              <option :value="false">Inactivo</option>
            </select>
          </div>

          <div class="col-span-2">
            <label class="block text-gray-700 text-sm font-bold mb-2">
              {{ editMode ? 'Nueva Contraseña (dejar vacío para no cambiar)' : 'Contraseña *' }}
            </label>
            <input 
              v-model="form.password" 
              type="password" 
              :required="!editMode" 
              class="input-field"
              minlength="8"
              placeholder="Mínimo 8 caracteres"
            >
          </div>
          
          <div class="col-span-2 flex justify-end space-x-3 mt-4">
            <button type="button" @click="closeModal()" class="btn-secondary">Cancelar</button>
            <button type="submit" class="btn-primary">{{ editMode ? 'Actualizar' : 'Crear' }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../services/api'

export default {
  name: 'Empleados',
  data() {
    return {
      empleados: [],
      showModal: false,
      editMode: false,
      form: {
        id: null,
        primer_nombre: '',
        segundo_nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        username: '',
        password: '',
        rol: '',
        email: '',
        activo: true
      }
    }
  },
  mounted() {
    this.loadEmpleados()
  },
  methods: {
    async loadEmpleados() {
      try {
        const response = await api.empleados.getAll()
        this.empleados = response.data
      } catch (error) {
        alert('Error al cargar empleados')
      }
    },
    getRolDisplayName(rol) {
      const nombres = {
        'ADMINISTRADOR': 'Administrador',
        'SOPORTE': 'Soporte',
        'VENDEDOR': 'Vendedor',
        'CAJERO': 'Cajero',
        'ALMACEN': 'Almacén'
      }
      return nombres[rol] || rol
    },
    getRolClass(rol) {
      const classes = {
        'ADMINISTRADOR': 'bg-purple-100 text-purple-800',
        'SOPORTE': 'bg-blue-100 text-blue-800',
        'VENDEDOR': 'bg-green-100 text-green-800',
        'CAJERO': 'bg-teal-100 text-teal-800',
        'ALMACEN': 'bg-yellow-100 text-yellow-800'
      }
      return classes[rol] || 'bg-gray-100 text-gray-800'
    },
    openModal(empleado = null) {
      if (empleado) {
        this.editMode = true
        this.form = { ...empleado, password: '' }
      } else {
        this.editMode = false
        this.form = {
          id: null,
          primer_nombre: '',
          segundo_nombre: '',
          apellido_paterno: '',
          apellido_materno: '',
          username: '',
          password: '',
          rol: '',
          email: '',
          activo: true
        }
      }
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    },
    async saveEmpleado() {
      try {
        const data = { ...this.form }
        if (this.editMode && !data.password) {
          delete data.password
        }

        if (this.editMode) {
          await api.empleados.update(this.form.id, data)
          alert('Empleado actualizado exitosamente')
        } else {
          await api.empleados.create(data)
          alert('Empleado creado exitosamente')
        }
        this.closeModal()
        this.loadEmpleados()
      } catch (error) {
        alert('Error: ' + (error.response?.data?.error || error.message))
      }
    },
    async deleteEmpleado(id) {
      if (!confirm('¿Desactivar este empleado?')) return
      try {
        await api.empleados.delete(id)
        alert('Empleado desactivado')
        this.loadEmpleados()
      } catch (error) {
        alert('Error: ' + (error.response?.data?.error || error.message))
      }
    }
  }
}
</script>