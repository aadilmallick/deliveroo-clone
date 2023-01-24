# Project Overview

Technologies used:

- React Native (Expo)
- Redux Toolkit
- Sanity.io
- Nativewind
- React Native Navigation

## Project quickstart

1. Run quick installation of all necessary dependencies

```bash
npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/native-stack nativewind
npx tailwindcss init
npm i prop-types @reduxjs/toolkit react-redux axios
```

# What problems I had, and how I fixed them.

## Scrollview and flex??

## Making a working shadow

## Random Babel and sanity error

[https://stackoverflow.com/questions/71638565/parsing-error-cannot-find-module-babel-preset-env-for-sanity]

```json
// .eslintrc
{
  "extends": "@sanity/eslint-config-studio",
  "eslint.workingDirectories": ["./web", "./studio"]
}
```

This is how you fix the error in sanity saying that it can't find `@babel/preset-env` as a dependency.

## Hooks and conditionality error

Hooks must always be run in the same order each time. In other words. You must **NEVER** put hooks in or after a conditional!

> WRONG

```js
if (some_condition) {
  return null;
}

const navigation = useNavigation();
```

## Mapview and deployed build error

For some reason, with deployed apk or aab builds, the `MapView` doesn't work. The reason for this is that you need to supply a google maps API key to work with the mapview.

## Handling back buttons

https://stackoverflow.com/questions/62875629/how-to-navigate-to-a-screen-on-back-button-press-in-react-navigation-5-stack-nav

# Things I learned in this project

## Sanity.io tutorial

### Setup

1. Setup a new sanity project with `sanity init`. Name the folder containing your CMS as "sanity", just for reference and convenience.
2. cd into the folder
3. Start the sanity server with `npm run dev`.

```bash
sanity init
cd sanity
npm run dev
```

If you have some sort of babel error, enter this into your `.eslintrc`.

```json
// .eslintrc
{
  "extends": "@sanity/eslint-config-studio",
  "eslint.workingDirectories": ["./web", "./studio"]
}
```

### Schema

This is what a schema in sanity looks like. It has 4 fields, each with their own type and requirements. You export this schema, and join it up in the `index.js`, connecting it to the `schemaTypes` and exporting to sanity.

1. Create and export a schema

```js
import { defineField, defineType } from "sanity";

export default defineType({
  name: "dog",
  title: "Dog",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name of Dog",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "backstory",
      title: "Backstory of Dog",
      type: "string",
      validation: (Rule) => Rule.max(200).error("backstory too long!"),
    }),
    defineField({
      name: "image",
      title: "Image of Dog",
      type: "image",
    }),
    defineField({
      name: "children",
      title: "The children of the dog",
      type: "array",
      of: [{ type: "reference", to: [{ type: "puppy" }] }],
    }),
    defineField({
      name: "owner",
      title: "The owner of the dog",
      type: "reference",
      to: [{ type: "owner" }],
    }),
  ],
});
```

2. Join it up to `index.js`

```js
import dog from "./dog";
import puppy from "./puppy";

export const schemaTypes = [puppy, dish, dog, featured];
```

#### Schema in depth

You create a schema using the `defineType()` method, passing in an object. Here are the properties you have to fill out:

- `name` : the name of the schema that will be used in the code. In GROQ querying, this will be the value of the `_type` attribute for each document.
- `type`: what type of schema this should be. Just leave it as "document".
- `title` : the UI name that will appear over this schema in the sanity studio.
- `fields` : a list of fields for the schema.

To fill out the fields of the schema, use the `defineField()` method and pass in an object defining the requirements and type of the field with these properties:

- `name` : the name of the field used in GROQ querying
- `title` : the UI name that will appear over this field in the Sanity studio.
- `type`: the field type

##### Schema References

Fill out later.

### Unsplash

For image fields, wouldn't it be nice if we could just pick and upload images from unsplash instead of uploading them? With the unsplash sanity plugin, we can!

1. Install the `'sanity-plugin-asset-source-unsplash'` library.
2. Add the `unsplashImageAsset()` plugin to `plugins` array.

```js
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
// add here
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
// add here

export default defineConfig({
  name: "default",
  title: "deliveroo-clone",

  projectId: "cqahg3xw",
  dataset: "production",

  plugins: [deskTool(), visionTool(), unsplashImageAsset()],

  schema: {
    types: schemaTypes,
  },
});
```

### GROQ querying

1. Run `sanity deploy`. This will host your sanity studio on the World Wide Web.
2. Create a `sanity.js` in your React Native app. The name doesn't matter, but the idea is that we use the sanity client to connect with our sanity studio.

```js
import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = sanityClient({
  projectId: "cqahg3xw",
  dataset: "production",
  apiVersion: "2021-03-25", // use current UTC date - see "specifying API version"!
  useCdn: true, // `false` if you want to ensure fresh data
});

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

export { urlFor, client };
```

### Fetching data from Sanity

```js
import React from "react";
import { client } from "../sanity";
export const useSanityQuery = (query, params = null) => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const parameters = params === null ? {} : params;
    try {
      client.fetch(query, parameters).then((fetchedData) => {
        setData(fetchedData);
      });
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, []);
  return [data, loading];
};
```

```js
const [data, loading] = useSanityQuery(`
  *[_type=="featured"]{
    ...,
    restaurants[]-> {
        ...,
      dishes[]-> {
        ...
      },
      category -> {
        name
      }
    }
  }
  `);
```

### Dealing with images

Using the `urlFor()` method we created earlier, we convert the sanity image reference type to a url using something like this:

```js
urlFor(data.image).url();
```

The code above will return the url for `data.image`.

## MapView

```js
import { Marker } from "react-native-maps";
import MapView from "react-native-maps";

export function MapScreen() {
  return (
    <View style={{ flex: 1 }}>
      ...
      <View style={{ flex: 1 }}>
        <MapView style={{ width: "100%", height: "100%" }}>
          <Marker
            coordinate={{
              latitude: 60.1212,
              longitude: 120.3546,
            }}
            title="Some marker"
            description="The best restaurant"
          />
        </MapView>
      </View>
    </View>
  );
}
```

## React Native Animatable

```js
import { SafeAreaView } from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable";

export default function PreparingOrderScreen() {
  return (
    <SafeAreaView>
      <Animatable.Image
        source={require("../assets/gifs/citygif.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-96 w-[80%]"
      />
      <Animatable.Text
        iterationCount={1}
        animation="slideInUp"
        className="text-white font-bold text-lg"
      >
        Hold on tight, your order is coming up ...
      </Animatable.Text>
    </SafeAreaView>
  );
}
```

## React Native Progress

## Redux

### IDs problem

One problem that I often ran into with redux is selecting everything in a certain slice. To fix that, I learned of this new technique where we select only the elements we want, filtering by something like an **id**.

```js
export const selectBasketItemsWithId = (state, id) => {
  return state.basket.items.filter((item) => item.id === id);
};
```

We then use these helper methods in the `useSelector()` hook.
