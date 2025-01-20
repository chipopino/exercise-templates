export const loremIpsum = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tristique magna sit amet purus gravida. Sem nulla pharetra diam sit amet nisl. Ut pharetra sit amet aliquam id diam maecenas. Vitae suscipit tellus mauris a diam maecenas sed. Dictumst quisque sagittis purus sit amet volutpat consequat mauris nunc. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi. Non consectetur a erat nam at lectus urna duis convallis. Venenatis tellus in metus vulputate eu scelerisque felis. Lectus quam id leo in vitae turpis.

Vestibulum lorem sed risus ultricies tristique nulla. Consectetur libero id faucibus nisl tincidunt eget nullam. At varius vel pharetra vel turpis nunc eget lorem dolor. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce ut. Tristique senectus et netus et malesuada fames ac turpis egestas. Vel fringilla est ullamcorper eget nulla facilisi etiam dignissim. Vitae tempus quam pellentesque nec nam aliquam. Vitae tempus quam pellentesque nec nam aliquam sem et tortor. Non quam lacus suspendisse faucibus interdum posuere lorem. Eget felis eget nunc lobortis mattis aliquam faucibus purus in.

Ut venenatis tellus in metus vulputate eu scelerisque felis. Nibh ipsum consequat nisl vel pretium lectus quam id leo. Risus at ultrices mi tempus imperdiet nulla malesuada. Malesuada fames ac turpis egestas maecenas pharetra convallis posuere morbi. Sed id semper risus in hendrerit gravida rutrum quisque non. Auctor augue mauris augue neque gravida in fermentum et. Sit amet justo donec enim diam vulputate ut pharetra sit. Ipsum dolor sit amet consectetur adipiscing elit ut. Consectetur adipiscing elit ut aliquam purus sit amet luctus.

Integer eget aliquet nibh praesent tristique magna sit amet purus. Sed risus ultricies tristique nulla aliquet enim tortor at.
`

export function isT() {
    if (typeof window !== 'undefined') {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
}