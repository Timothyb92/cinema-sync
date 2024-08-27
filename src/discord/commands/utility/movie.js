const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const axios = require('axios');
const { title } = require('process');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('movie')
    .setDescription('Gets a movie from TMDB api')
    .addStringOption(option => 
        option.setName('title')
      .setDescription('The movie title to search')
      .setRequired(true)),

  async execute(interaction) {
    const movieTitle = interaction.options.getString('title', true).toLowerCase();
    //TODO look into interaction.options - this is nebulous to me

    await interaction.deferReply();
    const titleSearchResults = await axios.get(`http://localhost:3000/movies/${movieTitle}`)
    const movieResults = titleSearchResults.data.results.map(movie => {
      const { title, id, poster_path, release_date } = movie;
      return {
        title,
        id,
        poster_path,
        release_date,
      }
    })

    //console.log(movieResults);

    let selectedMovie;
    let currentMovie = 0;

    const confirm = new ButtonBuilder()
      .setCustomId('confirm')
      .setLabel('Confirm movie')
      .setStyle(ButtonStyle.Success);

    const cancel = new ButtonBuilder()
      .setCustomId('cancel')
      .setLabel('Cancel')
      .setStyle(ButtonStyle.Danger);

    const nextMovie = new ButtonBuilder()
      .setCustomId('next')
      .setLabel('Display next movie title')
      .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder()
      .addComponents(cancel, confirm, nextMovie);

    await interaction.editReply({
      content: `Select ${movieResults[currentMovie].title}?`,
      components: [row],
    })
  },
};
