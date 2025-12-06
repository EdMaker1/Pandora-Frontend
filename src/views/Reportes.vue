<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Reportes y Estadísticas</h1>

    <!-- Cards de Resumen -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Total Ventas -->
      <div class="card bg-gradient-to-br from-green-500 to-green-600 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-green-100 text-sm font-medium">Total Ventas</p>
            <p class="text-3xl font-bold mt-2">S/ {{ resumen.total_ventas?.toFixed(2) || '0.00' }}</p>
            <p class="text-green-100 text-xs mt-1">{{ resumen.cantidad_ventas || 0 }} transacciones</p>
          </div>
          <div class="bg-white bg-opacity-20 p-4 rounded-full">
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Total Clientes -->
      <div class="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-blue-100 text-sm font-medium">Total Clientes</p>
            <p class="text-3xl font-bold mt-2">{{ resumen.total_clientes || 0 }}</p>
            <p class="text-blue-100 text-xs mt-1">Clientes registrados</p>
          </div>
          <div class="bg-white bg-opacity-20 p-4 rounded-full">
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Total Productos -->
      <div class="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-purple-100 text-sm font-medium">Total Productos</p>
            <p class="text-3xl font-bold mt-2">{{ resumen.total_productos || 0 }}</p>
            <p class="text-purple-100 text-xs mt-1">Productos activos</p>
          </div>
          <div class="bg-white bg-opacity-20 p-4 rounded-full">
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Productos Bajo Stock -->
      <div class="card bg-gradient-to-br from-red-500 to-red-600 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-red-100 text-sm font-medium">Bajo Stock</p>
            <p class="text-3xl font-bold mt-2">{{ productosBajoStock.length }}</p>
            <p class="text-red-100 text-xs mt-1">Productos críticos</p>
          </div>
          <div class="bg-white bg-opacity-20 p-4 rounded-full">
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Top Productos Vendidos -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div class="card">
        <h3 class="text-xl font-bold text-gray-800 mb-4">Top 5 Productos Más Vendidos</h3>
        <div v-if="resumen.productos_top && resumen.productos_top.length > 0" class="space-y-3">
          <div v-for="(producto, index) in resumen.productos_top" :key="index" 
               class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center space-x-3">
              <div class="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                {{ index + 1 }}
              </div>
              <span class="text-gray-800 font-medium">{{ producto.nombre }}</span>
            </div>
            <span class="text-primary font-bold">{{ producto.cantidad }} vendidos</span>
          </div>
        </div>
        <div v-else class="text-center text-gray-500 py-8">
          No hay datos de ventas
        </div>
      </div>

      <!-- Productos Bajo Stock -->
      <div class="card">
        <h3 class="text-xl font-bold text-gray-800 mb-4">Productos con Stock Crítico</h3>
        <div v-if="productosBajoStock.length > 0" class="space-y-3 max-h-80 overflow-y-auto">
          <div v-for="producto in productosBajoStock" :key="producto.id" 
               class="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
            <div>
              <p class="text-gray-800 font-medium">{{ producto.nombre }}</p>
              <p class="text-sm text-gray-500">{{ producto.marca || 'Sin marca' }}</p>
            </div>
            <span class="text-red-600 font-bold">Stock: {{ producto.stock_actual }}</span>
          </div>
        </div>
        <div v-else class="text-center text-gray-500 py-8">
          ✅ Todos los productos tienen stock adecuado
        </div>
      </div>
    </div>

    <!-- Tablas de Reportes -->
    <div class="grid grid-cols-1 gap-6">
      <!-- Reporte de Ventas Recientes -->
      <div class="card">
        <h3 class="text-xl font-bold text-gray-800 mb-4">Últimas Ventas</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="table-header">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Subtotal</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Descuento</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="venta in ventasRecientes" :key="venta.id" class="table-row">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{{ venta.id }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(venta.fecha) }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">Cliente #{{ venta.cliente_id || 'N/A' }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                  S/ {{ Number(venta.subtotal).toFixed(2) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-right text-red-600">
                  -S/ {{ Number(venta.descuento_monto).toFixed(2) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-primary">
                  S/ {{ Number(venta.total).toFixed(2) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <span class="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                    {{ venta.estado }}
                  </span>
                </td>
              </tr>
              <tr v-if="ventasRecientes.length === 0">
                <td colspan="7" class="px-6 py-4 text-center text-gray-500">No hay ventas registradas</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../services/api'

export default {
  name: 'Reportes',
  data() {
    return {
      resumen: {},
      productosBajoStock: [],
      ventasRecientes: []
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    async loadData() {
      try {
        const [resumenRes, bajoStockRes, ventasRes] = await Promise.all([
          api.reportes.resumen(),
          api.reportes.bajoStock(),
          api.reportes.ventas()
        ])
        
        this.resumen = resumenRes.data
        this.productosBajoStock = bajoStockRes.data
        this.ventasRecientes = ventasRes.data.slice(0, 10) // Últimas 10 ventas
      } catch (error) {
        console.error('Error al cargar reportes:', error)
        alert('Error al cargar reportes')
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