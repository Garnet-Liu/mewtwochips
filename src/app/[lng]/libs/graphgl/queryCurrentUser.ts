import { graphql } from "@/gql";

export const QueryCurrentUser = graphql(`
  query queryCurrentUser {
    currentUser {
      villageTracker {
        tag
        name
        expLevel
        trophies
        bestTrophies
        donations
        donationsReceived
        builderHallLevel
        builderBaseTrophies
        bestBuilderBaseTrophies
        warStars
        clanCapitalContributions
        league {
          id
          name
          iconUrls {
            medium
            small
            tiny
          }
        }
        builderBaseLeague {
          id
          name
        }
        clan {
          tag
          clanLevel
          name
          badgeUrls {
            medium
            small
            tiny
          }
        }
        role
        warPreference
        attackWins
        defenseWins
        townHallLevel
        townHallWeaponLevel
        troops {
          level
          maxLevel
          name
          village
        }
        heroes {
          level
          maxLevel
          name
          village
          equipment {
            level
            maxLevel
            name
            village
          }
        }
        heroEquipment {
          level
          maxLevel
          name
          village
        }
        spells {
          level
          maxLevel
          name
          village
        }
        labels {
          iconUrls {
            medium
            small
            tiny
          }
          id
          name
        }
        achievements {
          completionInfo
          info
          name
          stars
          target
          value
          village
        }
        playerHouse {
          elements {
            id
            type
          }
        }
      }
    }
  }
`);
