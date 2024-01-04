// MUI
import { Stack, Typography, Divider } from "@mui/material"
// React
import { ReactNode } from "react"

type VStackProps = {
    children: ReactNode
    padding?: boolean
}

export const VStack = ({children, padding = true}: VStackProps)=> {
    return (
        <Stack padding={padding ? 2 : 0} spacing={2}>
            {children}
        </Stack>
    )
}

type HeaderStackProps = {
    children: ReactNode
    title: string
}

export const FormHeaderStack = ({children, title}: HeaderStackProps)=> {
    return (<>
        <Stack
            direction={'row'}
            spacing={1}
            justifyContent={'space-between'}
            alignItems={'center'}
            flexWrap={'wrap'}
            useFlexGap>

            <Typography variant={'subtitle1'}>{title}</Typography>

            <Stack
                direction={'row'}
                spacing={1}
                alignItems={'center'}
                flexWrap={'wrap'}
                useFlexGap>
                {children}
            </Stack>

        </Stack>
        <Divider/>
    </>)
}

type FormBodyStackProps = {
    children: ReactNode
}

export const FormBodyStack = ({children}: FormBodyStackProps)=> {
    return (
        <Stack
            direction={'row'}
            flexWrap={'wrap'}
            useFlexGap
            p={1}
            spacing={3}
            alignItems={'flex-start'}>
            {children}
        </Stack>
    )
}

type FormSubtitleProps = {
    subtitle: string
    divider?: boolean
}

export const FormSubtitle = ({subtitle, divider = true}: FormSubtitleProps)=> {
    return (<>
        {divider && <Divider /> }
        <Typography px={1} variant={'caption'} color={'text.secondary'}>
            {subtitle}
        </Typography>
    </>)
}
