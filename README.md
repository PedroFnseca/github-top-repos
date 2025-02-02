# GitHub Top Repos: _Visualize Your Most Popular Repositories_
> GitHub Top Repos is a powerful tool that allows you to create a custom image showcasing your most popular GitHub repositories. Whether you want to highlight your top projects on your portfolio, blog, or social media, this application makes it easy to generate a visually appealing image with just a few clicks.

---

**GitHub Top Repos** is your go-to tool for showcasing your GitHub projects in style. Try it now and let your repositories shine! 🚀

- **Customizable Image**: Tailor the image to your preferences by adjusting the number of repositories, sorting order, and theme.
- **Easy to Use**: Simply enter your GitHub username, and the tool will generate an image for you.
- **Multiple Themes**: Choose between `light` and `dark` themes to match your style.
- **Flexible Sorting**: Sort repositories by `stars`, `name`, `updated`, or `created` date.
- **Open Source**: Contributions are welcome! Feel free to improve the tool or add new features.

The application uses GitHub's API to fetch your repositories and generates a custom image based on your preferences. You can customize the output by adjusting the parameters in the URL.

## Parameters

The API accepts the following parameters to customize the image:

| Parameter | Description | Required | Default |
|-----------|-------------|----------|---------|
| `username` | Your GitHub username | Yes | N/A |
| `top` | Number of repositories to display (valid values: 3, 5, 10) | No | 5 |
| `order` | Order of repository sorting (valid values: `asc` for ascending, `desc` for descending) | No | `desc` |
| `sort` | Type of repository sorting (valid values: `stars`, `name`, `updated`, `created`) | No | `stars` |
| `theme` | Image theme (valid values: `dark`, `light`) | No | `light` |

## Usage Example

1. Go to the [home page](https://top-repos-github.vercel.app/) and enter your GitHub username.
2. Click on "Generate Image 🚀".
3. The generated image will be displayed with your most popular repositories.

### Example URLs

- Default Parameters: 
  ```
  https://top-repos-github.vercel.app/api/generate?username=octocat
  ```

- Custom Top Repositories and Dark Theme: 
  ```
  https://top-repos-github.vercel.app/api/generate?username=octocat&top=3&theme=dark
  ```

- Sort by Name in Ascending Order: 
  ```
  https://top-repos-github.vercel.app/api/generate?username=octocat&sort=name&order=asc
  ```

## Contribution

We welcome contributions from the community! Whether you want to fix a bug, add a new feature, or improve the documentation, your help is appreciated. To contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your modifications.
4. Commit your changes and push them to your fork.
5. Submit a pull request to the main repository.

> ✏️ **Note**: Write a clear description of your changes in the pull request to help us understand the modifications.
