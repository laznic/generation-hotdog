
![Generation: Hotdog picture](https://github.com/laznic/generation-hotdog/blob/main/public/share-img.png?raw=true)

## Imagine. Share. Generate.

Generation: Hotdog is a one of a kind experience. What kind of experience is what you'll have to find out yourself.

https://generationhotdog.com

> **Note**
>
> This project is optimized for desktop devices, no guarantees it'll work well in mobile.

<sup>Made for Supabase Launch Week 7 Hackathon.</sup> 

Built with
- [Supabase](https://supabase.com)
- [React](https://reactjs.org/)
- [OpenAI](https://openai.com/)
- [Stable Diffusion](https://stability.ai/stable-diffusion)
- [shadcn/ui](https://ui.shadcn.com/)

## How it works

> **Warning**
>
> SPOILER ALERT! SPOILER ALERT! SPOILER ALERT!  SPOILER ALERT! 
>
> I'll go through some details how it works, however I recommend just trying it in order to get the full experience.

As the name suggests, this is about generating hotdogs. The steps are simple:
1. Create room
2. Select 5 emojis
3. Optionally share the room link with your friends to allow them to join the process
4. Press ready and enjoy the ride

It uses both OpenAI and Stable Diffusion APIs to generate the end results. First, it'll use the selected emojis to
generate a description of a hotdog via OpenAI, and then it'll also translate that text to Japanese Kanji (also via OpenAI).

Then, in order to put together a _working_ prompt for Stable Diffusion, we'll pick some random keywords from premade lists,
and pass the OpenAI generated prompt along with it. Then Stable Diffusion does some crunching, and generates a picture of a hot dog for
us.

The end results can vary quite differently, however that's the beauty and purpose of this project: a generation of hotdogs which 
each are unique and beautiful.

No login is required as it keeps track of anon users by devices (it just stores the "creator" UUID in local storage).

List of Supabase features used:
- Database
  - storing creators & hotdogs
- Realtime
  - triggering animations, updating ready state
- Functions
  - handles data fetching etc. just to be able to enable RLS for fully anon usage
  - first time using these!
- Storage
  - storing the generated images

## Motivation

I wanted to do something hotdog related again (obviously), and initially this started as kind of a joke. Like something just for laughs.
However once I started tinkering, I started having a lot of creative ideas which made this project turn into an art project (or sort of).

I'm a fan of Neon Genesis Evangelion, so design has gotten some inspiration from it.

## Ideas for the future

- More nicer and dynamic animations
- Use more updated Stable Diffusion model
  - Now had to use v1.5 as others didn't produce as good results for hotdogs
- Organize code better & do some refactoring/improving
- Something with authentication?

## The team / contributors
- laznic ([GitHub](https://github.com/laznic), [Twitter](https://twitter.com/laznic))

## Thanks to
- My friend Jani R. for providing design feedback and being one of the inspirations for the project
