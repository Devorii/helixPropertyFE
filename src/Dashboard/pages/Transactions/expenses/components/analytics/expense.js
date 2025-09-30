import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';


const cards = [
    {
        id: 1,
        title: 'This Month',
        description: '$200',
    },
    {
        id: 2,
        title: 'Quarterly',
        description: '$200',
    },
    {
        id: 3,
        title: 'Annually',
        description: '$200',
    },
];



const ExpenseAnalytics = () => {
    const [selectedCard, setSelectedCard] = useState(0)
    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
                    gap: 2,
                }}
            >
                {cards.map((card, index) => (
                    <Card>
                        <CardActionArea
                            onClick={() => setSelectedCard(index)}
                            data-active={selectedCard === index ? '' : undefined}
                            sx={{
                                height: '100%',
                                '&[data-active]': {
                                    backgroundColor: 'action.selected',
                                    '&:hover': {
                                        backgroundColor: 'action.selectedHover',
                                    },
                                },
                            }}
                        >
                            <CardContent sx={{ height: '100%' }}>
                                <Typography variant="h6" component="div">
                                    {card.title}
                                </Typography>
                                <Typography variant="body" color="text.secondary">
                                    {card.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>

        </>
    )
}

export default ExpenseAnalytics;