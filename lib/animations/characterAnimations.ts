import { CharacterType, AnimationType } from '@/components/3d/Character3D';
import { AnimationVariant } from '@/components/2d/Character2D';

export interface AnimationConfig {
  duration: number;
  loop?: boolean;
  trigger?: 'click' | 'hover' | 'auto';
  easing?: string;
}

export const characterAnimations: Record<CharacterType, Record<AnimationType | AnimationVariant, AnimationConfig>> = {
  luffy: {
    idle: { duration: 2, loop: true, trigger: 'auto' },
    walking: { duration: 1, loop: true, trigger: 'auto' },
    fighting: { duration: 0.5, loop: true, trigger: 'click' },
    emote: { duration: 1, loop: false, trigger: 'click' },
    waving: { duration: 1, loop: true, trigger: 'hover' },
    excited: { duration: 0.5, loop: true, trigger: 'click' },
    thinking: { duration: 2, loop: true, trigger: 'auto' },
    sleeping: { duration: 3, loop: true, trigger: 'auto' },
    angry: { duration: 0.4, loop: true, trigger: 'click' },
  },
  zoro: {
    idle: { duration: 2.5, loop: true, trigger: 'auto' },
    walking: { duration: 1.2, loop: true, trigger: 'auto' },
    fighting: { duration: 0.6, loop: true, trigger: 'click' },
    emote: { duration: 1.2, loop: false, trigger: 'click' },
    waving: { duration: 1, loop: true, trigger: 'hover' },
    excited: { duration: 0.6, loop: true, trigger: 'click' },
    thinking: { duration: 2.5, loop: true, trigger: 'auto' },
    sleeping: { duration: 3.5, loop: true, trigger: 'auto' },
    angry: { duration: 0.5, loop: true, trigger: 'click' },
  },
  crocodile: {
    idle: { duration: 2.5, loop: true, trigger: 'auto' },
    walking: { duration: 1.3, loop: true, trigger: 'auto' },
    fighting: { duration: 0.7, loop: true, trigger: 'click' },
    emote: { duration: 1.3, loop: false, trigger: 'click' },
    waving: { duration: 1.1, loop: true, trigger: 'hover' },
    excited: { duration: 0.6, loop: true, trigger: 'click' },
    thinking: { duration: 2.5, loop: true, trigger: 'auto' },
    sleeping: { duration: 3.5, loop: true, trigger: 'auto' },
    angry: { duration: 0.5, loop: true, trigger: 'click' },
  },
  doflamingo: {
    idle: { duration: 2.3, loop: true, trigger: 'auto' },
    walking: { duration: 1.1, loop: true, trigger: 'auto' },
    fighting: { duration: 0.6, loop: true, trigger: 'click' },
    emote: { duration: 1.2, loop: false, trigger: 'click' },
    waving: { duration: 1, loop: true, trigger: 'hover' },
    excited: { duration: 0.5, loop: true, trigger: 'click' },
    thinking: { duration: 2.3, loop: true, trigger: 'auto' },
    sleeping: { duration: 3.3, loop: true, trigger: 'auto' },
    angry: { duration: 0.4, loop: true, trigger: 'click' },
  },
  mihawk: {
    idle: { duration: 2.8, loop: true, trigger: 'auto' },
    walking: { duration: 1.4, loop: true, trigger: 'auto' },
    fighting: { duration: 0.8, loop: true, trigger: 'click' },
    emote: { duration: 1.4, loop: false, trigger: 'click' },
    waving: { duration: 1.2, loop: true, trigger: 'hover' },
    excited: { duration: 0.7, loop: true, trigger: 'click' },
    thinking: { duration: 2.8, loop: true, trigger: 'auto' },
    sleeping: { duration: 3.8, loop: true, trigger: 'auto' },
    angry: { duration: 0.6, loop: true, trigger: 'click' },
  },
  captain: {
    idle: { duration: 2, loop: true, trigger: 'auto' },
    walking: { duration: 1, loop: true, trigger: 'auto' },
    fighting: { duration: 0.5, loop: true, trigger: 'click' },
    emote: { duration: 1, loop: false, trigger: 'click' },
    waving: { duration: 1, loop: true, trigger: 'hover' },
    excited: { duration: 0.5, loop: true, trigger: 'click' },
    thinking: { duration: 2, loop: true, trigger: 'auto' },
    sleeping: { duration: 3, loop: true, trigger: 'auto' },
    angry: { duration: 0.4, loop: true, trigger: 'click' },
  },
};

export const specialMoves: Record<CharacterType, string[]> = {
  luffy: ['Gomu Gomu no Pistol', 'Gear Second', 'Gear Third', 'Gear Fourth'],
  zoro: ['Oni Giri', 'Santoryu', 'Asura', 'Purgatory Oni Giri'],
  crocodile: ['Desert Spada', 'Sables', 'Ground Secco', 'Desert La Spada'],
  doflamingo: ['Overheat', 'Parasite', 'God Thread', 'Birdcage'],
  mihawk: ['Yoru Slash', 'Black Blade', 'World\'s Strongest Slash'],
  captain: ['Code Refactor', 'System Architecture', 'Production Deploy', 'Team Motivation'],
};

