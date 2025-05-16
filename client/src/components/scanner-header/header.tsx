import React from "react";
import Link from "next/link";
import "./header.scss";
import { Box, Tab, Tabs } from "@mui/material";
interface NavItem {
    id: number;
    label: string;
    href: string;
}

interface DashboardHeaderProps {
    navigation?: NavItem[];
}

export default function ScannerHeader({ navigation = [] }: DashboardHeaderProps) {
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }
    return (
        <header className="l-dashboard-header">
            <div className="l-dashboard-header__left">
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
                        {navigation.map((item, i) => (
                            <Tab
                                key={item.id}
                                label={item.label}
                                value={i}
                                component={Link}
                                href={item.href}
                                sx={{ textTransform: 'none', fontWeight: 500, backgroundColor: 'white', height: 4, minWidth: '150px', width: '100%', color: '#000', '&.Mui-selected': { backgroundColor: '#f0f0f0' } }}
                            />
                        ))}
                    </Tabs>

                </Box>
            </div>
        </header>
    );
}
