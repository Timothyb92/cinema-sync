const {
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require('discord.js');
const axios = require('axios');
const moment = require('moment');
// const { title } = require('process');
// const { release } = require('os');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('movie')
    .setDescription('Select a movie and schedule a time to watch')
    .addStringOption((option) =>
      option
        .setName('title')
        .setDescription('The movie title to search')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('date')
        .setDescription('The day you want to host the movie')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('time')
        .setDescription('The time you want to host the movie')
        .setRequired(true)
    ),

  async execute(interaction) {
    const movieTime = interaction.options.getString('time', true);
    const parsedTime = moment(movieTime, ['h:mm A', 'H:mm'], true);

    const movieDate = interaction.options.getString('date', true);
    const parsedDate = moment(movieDate, 'MM-DD-YYYY', true);

    if (!parsedTime.isValid() || !parsedDate.isValid()) {
      await interaction.reply({
        content:
          'Invalid time or date format. Please enter a time like "7:30 PM" or "19:30", and dates in MM-DD-YYYY format.',
        ephemeral: true,
      });
      return;
    }

    const movieTitle = interaction.options
      .getString('title', true)
      .toLowerCase();
    //TODO look into interaction.options - this is nebulous to me

    await interaction.deferReply({ ephemeral: true });
    const titleSearchResults = await axios.get(
      `http://localhost:3000/movies/${movieTitle}`
    );
    const movieResults = titleSearchResults.data.results.map((movie) => {
      const { title, overview, id, poster_path, release_date } = movie;
      return {
        title,
        id,
        poster_path,
        release_date,
        overview,
      };
    });

    console.log(`Total movies found: ${movieResults.length}`);

    let selectedMovie;
    let currentMovie = 0;

    async function updateMessage() {
      const select = new ButtonBuilder()
        .setCustomId('select')
        .setLabel('Select movie')
        .setStyle(ButtonStyle.Success);

      const cancel = new ButtonBuilder()
        .setCustomId('cancel')
        .setLabel('Cancel')
        .setStyle(ButtonStyle.Danger);

      const nextMovie = new ButtonBuilder()
        .setCustomId('next')
        .setLabel('Display next movie title')
        .setStyle(ButtonStyle.Secondary);

      const row = new ActionRowBuilder().addComponents(
        cancel,
        select,
        nextMovie
      );

      let { poster_path, title, release_date, overview } =
        movieResults[currentMovie];
      let poster = `https://image.tmdb.org/t/p/w200${poster_path}`;

      const response = await interaction.editReply({
        content: `Select ${title}? \n \n ${overview} \n \n Relased on ${release_date} \n \n ${poster}`,
        components: [row],
      });

      try {
        const confirmation = await response.awaitMessageComponent({
          time: 60_000,
        });

        if (confirmation.customId === 'select') {
          await confirmation.update({
            content: `You selected ${title}`,
            components: [],
          });

          await confirmation.followUp(
            `<@${interaction.user.id}> will be hosting a movie! ${title} will be showing on ${movieDate} at ${movieTime} \n \n ${title} \n \n ${overview} \n \n ${poster}`
          );
        } else if (confirmation.customId === 'cancel') {
          await confirmation.update({
            content: 'Cancelled movie search',
            components: [],
          });
        } else if (confirmation.customId === 'next') {
          currentMovie++;
          await confirmation.deferUpdate();
          await updateMessage();
        }
      } catch (e) {
        console.error(e);
      }
    }

    await updateMessage();
  },
};
