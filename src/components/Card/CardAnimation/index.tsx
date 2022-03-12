import React, { useEffect } from 'react';
import { useWindowDimensions, ViewProps } from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

import { AnimationContainer } from './styles';

interface CardAnimationProps extends ViewProps {
  children: React.ReactNode;
}

export function CardAnimation({ children, ...rest }: CardAnimationProps) {
  const { width: displayWidth } = useWindowDimensions();
  const cardOpacity = useSharedValue(0);
  const cardOffset = useSharedValue(0.25 * displayWidth);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
       
        { translateX: cardOffset.value},
        
      ],
      opacity: cardOpacity.value
       
    }
  })

  useEffect(() => {
    
    cardOpacity.value = withTiming(1, { duration: 1000 });
    cardOffset.value = withTiming(0, { duration: 1000 });
     
    console.log(cardOpacity.value);
    console.log(cardOffset.value);

  }, []);

  return (
    <AnimationContainer {...rest} style={animatedStyle}>
      {children}
    </AnimationContainer>
  )
}