import { Home } from '@mui/icons-material'
import { Box, Button, Container, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';

export const WithoutDocumentation = () => {
    const navigate = useNavigate()
    return (
        <Container sx={{ width: '80vw' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '80vh',

                    textAlign: 'center',
                }}
            >
                <Typography variant="h2" component="h1" gutterBottom>
                    Sin documentación
                </Typography>
                <Typography variant="h5" component="p" gutterBottom sx={{ mb: 4 }}>
                    Lo sentimos, esta sección aún no tiene documentación disponible.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Home />}
                    size="large"
                    onClick={() => {
                        navigate(-1)
                    }}
                >
                    Volver al inicio
                </Button>
            </Box>
        </Container>
    )
}
