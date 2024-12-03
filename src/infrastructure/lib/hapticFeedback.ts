import ReactNativeHapticFeedback, {
	HapticFeedbackTypes,
} from 'react-native-haptic-feedback';

export const triggerHaptic = (type = 'impactLight' as HapticFeedbackTypes) => {
	ReactNativeHapticFeedback.trigger(type);
};
