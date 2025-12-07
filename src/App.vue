<script>
import api from './services/api'
import axios from 'axios'

export default {
  name: 'App',
  data() {
    return {
      user: null,
      loading: true
    }
  },
  computed: {
    isAuthenticated() {
      return !!this.user
    }
  },
  async mounted() {
    // Verificar si hay un token en la URL (desde Google OAuth)
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    
    if (token) {
      try {
        console.log('🔑 Token detectado en URL, intercambiando...')
        
        // Intercambiar token por datos de usuario
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
        const response = await axios.post(
          `${API_URL}/auth/google/exchange-token`,
          { token },
          { 
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true 
          }
        )
        
        console.log('✅ Token intercambiado exitosamente')
        this.user = response.data
        localStorage.setItem('user', JSON.stringify(response.data))
        
        // Limpiar URL (quitar el token)
        window.history.replaceState({}, document.title, '/')
      } catch (error) {
        console.error('❌ Error intercambiando token:', error)
        // Si falla, continuar con checkAuth normal
      }
    }
    
    // Continuar con checkAuth normal si no había token o si falló
    if (!this.user) {
      await this.checkAuth()
    } else {
      this.loading = false
    }
  },
  methods: {
    async checkAuth() {
      try {
        // Primero intentar obtener usuario del servidor (sesión)
        const response = await api.auth.me()
        this.user = response.data
        // Sincronizar con localStorage para compatibilidad
        localStorage.setItem('user', JSON.stringify(response.data))
      } catch (error) {
        // Si falla, intentar obtener de localStorage (login tradicional)
        const userData = localStorage.getItem('user')
        if (userData) {
          this.user = JSON.parse(userData)
        } else {
          this.user = null
        }
      } finally {
        this.loading = false
      }
    },
    async handleLogout() {
      try {
        await api.auth.logout()
        localStorage.removeItem('user')
        this.user = null
        this.$router.push('/login')
      } catch (error) {
        console.error('Error al cerrar sesión:', error)
        // Limpiar de todas formas
        localStorage.removeItem('user')
        this.user = null
        this.$router.push('/login')
      }
    }
  },
  watch: {
    async '$route'() {
      if (!this.user) {
        await this.checkAuth()
      }
    }
  }
}
</script>