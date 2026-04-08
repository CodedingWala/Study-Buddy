import { useAuth } from '@clerk/expo';
import { Redirect } from 'expo-router';
import { NativeTabs } from 'expo-router/unstable-native-tabs';

const _layout = () => {
    const { isSignedIn, isLoaded } = useAuth()
    if (!isLoaded) {
        return null
    }

    if (!isSignedIn) {
        return <Redirect href={'/(auth)'} />
    }
    return (
        <NativeTabs tintColor="default"
            backgroundColor="#16213E"              // White background
            iconColor={{
                default: "#ffffff",                  // Black for inactive icons
                selected: "#6C5CE7"                  // Purple for selected icons
            }}
            labelStyle={{
                fontSize: 12,
                fontWeight: '500',
                color: '#ffffff'                     // Black for ALL labels (NativeTabs limitation)
            }}
        >
            <NativeTabs.Trigger name="index">
                <NativeTabs.Trigger.Label>chats</NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon sf="message" md="chat" />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="explore">
                <NativeTabs.Trigger.Label>explore</NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon sf="safari" md="explore" />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="profile">
                <NativeTabs.Trigger.Label>profile</NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon sf="person" md="person" />
            </NativeTabs.Trigger>
        </NativeTabs>
    )
}

export default _layout