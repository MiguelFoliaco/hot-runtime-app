import { Grid, Typography } from "@mui/material";
import { Tables } from "../../../../database.types";

export const ContextMenu = ({ options, onOptionClick, pos }: { pos: { x: number, y: number }, options: Tables<'components'>[], onOptionClick: (data: Tables<'components'>) => Promise<void> }) => {
    return (
        <Grid
            sx={{
                position: 'fixed',
                top: pos.y,
                left: pos.x,
                width: '200px',
                border: t => `1px dashed ${t.palette.text.secondary}10`,
                listStyleType: 'none',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '4px',
                zIndex: 1000,
                bgcolor: 'background.paper',
            }}
        >
            {options.map((option, index) => (
                <Grid
                    key={index}
                    sx={{
                        padding: '3px 6px',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        borderTop: t => `1px dashed ${t.palette.text.secondary}10`,
                        ':hover': {
                            bgcolor: '#111'
                        }
                    }}
                    onClick={() => onOptionClick(option)}
                >
                    <Typography variant="caption">{option.name}</Typography>
                    <Typography variant="caption" color='#FFFFFF40'>component</Typography>
                </Grid>
            ))}
        </Grid>
    );
};