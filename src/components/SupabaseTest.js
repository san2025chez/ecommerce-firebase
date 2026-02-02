import React, { useEffect, useState } from 'react';
import { client } from '../supabase/client';
import { Box, Paper, Typography, Button } from '@mui/material';

const SupabaseTest = () => {
  const [status, setStatus] = useState('Probando conexión...');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const testConnection = async () => {
    try {
      console.log("🧪 Iniciando test de conexión a Supabase...");
      
      // Test 1: Verificar cliente
      console.log("1️⃣ Cliente Supabase:", client ? "✅ Inicializado" : "❌ No inicializado");
      console.log("📍 URL:", process.env.REACT_APP_SUPABASE_URL);
      
      if (!client) {
        throw new Error("Cliente Supabase no inicializado");
      }

      // Test 2: Query simple
      console.log("2️⃣ Ejecutando query...");
      setStatus('Consultando tabla utiles...');
      
      const { data: testData, error: testError, count } = await client
        .from('utiles')
        .select('*', { count: 'exact' });

      if (testError) {
        console.error("❌ Error en query:", testError);
        setError(testError);
        setStatus(`Error: ${testError.message}`);
        return;
      }

      console.log("✅ Query exitosa!");
      console.log("📊 Cantidad de registros:", count);
      console.log("📦 Datos:", testData);
      
      setData(testData);
      setStatus(`✅ Conexión exitosa! ${count || 0} registros encontrados`);
      
    } catch (err) {
      console.error("❌ Error en test:", err);
      setError(err);
      setStatus(`❌ Error: ${err.message}`);
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, maxWidth: 800, margin: '0 auto' }}>
        <Typography variant="h4" gutterBottom>
          🧪 Test de Conexión Supabase
        </Typography>
        
        <Typography variant="h6" sx={{ mt: 2 }}>
          Estado: {status}
        </Typography>

        {error && (
          <Paper sx={{ p: 2, mt: 2, bgcolor: '#ffebee' }}>
            <Typography variant="h6" color="error">
              ❌ Error Detectado:
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, fontFamily: 'monospace' }}>
              {JSON.stringify(error, null, 2)}
            </Typography>
          </Paper>
        )}

        {data && (
          <Paper sx={{ p: 2, mt: 2, bgcolor: '#e8f5e9' }}>
            <Typography variant="h6" color="success">
              ✅ Datos recibidos:
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                mt: 1, 
                fontFamily: 'monospace',
                maxHeight: 300,
                overflow: 'auto',
                whiteSpace: 'pre-wrap'
              }}
            >
              {JSON.stringify(data, null, 2)}
            </Typography>
          </Paper>
        )}

        <Button 
          variant="contained" 
          onClick={testConnection}
          sx={{ mt: 2 }}
        >
          🔄 Reintentar
        </Button>

        <Paper sx={{ p: 2, mt: 3, bgcolor: '#fff3e0' }}>
          <Typography variant="h6">
            📋 Checklist de Diagnóstico:
          </Typography>
          <Typography variant="body2" component="div" sx={{ mt: 1 }}>
            <ul>
              <li>✅ Variables de entorno configuradas (.env)</li>
              <li>✅ Servidor reiniciado después de crear .env</li>
              <li>⚠️ Verificar RLS (Row Level Security) en Supabase</li>
              <li>⚠️ Verificar que la tabla 'utiles' existe</li>
              <li>⚠️ Verificar que la tabla tiene datos</li>
            </ul>
          </Typography>
        </Paper>

        <Paper sx={{ p: 2, mt: 2, bgcolor: '#e3f2fd' }}>
          <Typography variant="h6">
            🔧 Soluciones Comunes:
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>Si ves "JWT expired" o "invalid JWT":</strong> La ANON_KEY está mal o expiró
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>Si ves "relation does not exist":</strong> La tabla 'utiles' no existe o tiene otro nombre
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>Si ves "permission denied" o "row-level security":</strong> 
            Debes deshabilitar RLS temporalmente en Supabase:
            <code style={{ display: 'block', background: '#000', color: '#0f0', padding: '10px', marginTop: '5px' }}>
              ALTER TABLE utiles DISABLE ROW LEVEL SECURITY;
            </code>
          </Typography>
        </Paper>
      </Paper>
    </Box>
  );
};

export default SupabaseTest;
