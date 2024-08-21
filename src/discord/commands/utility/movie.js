const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

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
    console.log(titleSearchResults.data.results[0]);
    await interaction.editReply(`Logging search results`);
  },
};
