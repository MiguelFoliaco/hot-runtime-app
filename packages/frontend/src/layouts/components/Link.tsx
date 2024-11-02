import { styled } from '@mui/material'
import { Link as L } from 'react-router-dom'

export const Link = styled(L)`
font-family:'Open Sans';
color:${theme => theme.color || '#EEE'};
text-decoration:none;
font-size:13px;
text-transform:uppercase;
letter-spacing: 0.1rem;
`